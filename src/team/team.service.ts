import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TeamModel} from "./model/team.model";
import {CreateTeamDto} from "./dto/create-team.dto";
import {TagModel} from "../tag/model/tag.model";
import {TagService} from "../tag/tag.service";
import {UserModel} from "../user/model/user.model";
import {UserService} from "../user/user.service";
import {UpdateTeamDto} from "./dto/update-team.dto";
import {MasterModel} from "../master/model/master.model";
import {MasterService} from "../master/master.service";
import {ResponseTeamDto} from "./dto/response-team.dto";
import {FileService} from "../file/file.service";
import {CreateTagDto} from "../tag/dto/create-tag.dto";
import {filter} from "rxjs";
import * as process from "process";

@Injectable()
export class TeamService {
    constructor(@InjectModel(TeamModel) private teamRepository: typeof TeamModel,
                private tagService: TagService,
                @Inject(forwardRef(() => UserService))
                private userService: UserService,
                private masterService: MasterService,
                private fileService: FileService) {}

    // POST: get all teams in current town (search)
    async getAll(dto: {cityId: number, search: string}): Promise<ResponseTeamDto[]> {
        const teams: TeamModel[] = await this.teamRepository.findAll({include: {all: true}});
        const filterTeams: TeamModel[] = teams.filter(team => {
            if (!dto.cityId || team.city.id === dto.cityId) {
                let isSearched = false;
                team.tags.forEach(tag => {
                    if (!dto.search) {
                        return true;
                    }
                    dto.search.split(' ').forEach((word) => {
                        if (tag.value.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(tag.value.toLowerCase())) {
                            isSearched = true;
                        }
                    });
                })
                return isSearched;
            }
            return false;
        })
        return filterTeams.map(team => new ResponseTeamDto(team));
    }

    // GET: get team by id
    async getById(id: number): Promise<ResponseTeamDto> {
        const team: TeamModel = await this.teamRepository.findByPk(id, {include: {all: true}});

        if (!team) {
            throw new HttpException({message: 'Команда с таким id не найден'}, HttpStatus.BAD_REQUEST);
        }

        return new ResponseTeamDto(team);
    }

    // POST: create team
    async create(dto: CreateTeamDto): Promise<{ message: string }> {
        const admin: UserModel = await this.userService.getModelById(dto.admin_id);

        if (admin.team_id) {
            throw new HttpException({message: 'Вы уже состоите в команде'}, HttpStatus.BAD_REQUEST);
        }

        if (!dto.title || !dto.email || !dto.city_id) {
            throw new HttpException({message: 'Не все обязательные поля заполнены'}, HttpStatus.BAD_REQUEST);
        }

        const team: TeamModel = await this.teamRepository.create(dto);

        const tags: TagModel[] = await this.tagService.addTags(dto.tags);
        await team.$set('tags', tags);

        await team.$set('users', [admin]);

        const master: MasterModel = await this.masterService.create(dto.admin_id);
        await admin.$set('master', master);

        return {message: 'success'};
    }

    // PUT update team info
    async update(id: number, dto: UpdateTeamDto): Promise<ResponseTeamDto> {
        await this.teamRepository.update(dto, {where: {id}})
        const updatedTeam: TeamModel = await this.getModelById(id);
        return new ResponseTeamDto(updatedTeam);
    }

    async delete(id: number): Promise<{message: string}> {
        const team: TeamModel = await this.getModelById(id);
        await this.fileService.delete(team.image);
        await this.teamRepository.destroy({where: {id}});
        return {message: 'success'};
    }

    // POST add tag
    async addTag(id: number, dto: CreateTagDto): Promise<{ message: string }> {
        const [tag]: TagModel[] = await this.tagService.addTags([dto]);
        const team: TeamModel = await this.getModelById(id);
        if (!team.tags.filter((tag) => tag.value === dto.value).length) {
            await team.$set('tags', [...team.tags, tag]);
        } else {
            throw new HttpException({message: 'Такой тег уже присутствует'}, HttpStatus.BAD_REQUEST);
        }
        return {message: 'success'};
    }

    // DELETE delete tag
    async deleteTag(id: number, dto: CreateTagDto): Promise<{ message: string }> {
        const tag: TagModel = await this.tagService.getByValue(dto.value);
        const team: TeamModel = await this.getModelById(id);
        await team.$remove('tags', tag);
        return {message: 'success'};
    }

    // PUT update image
    async updateImage(id: number, image: any): Promise<string> {
        const team: TeamModel = await this.getModelById(id);
        if (team.image) {
            await this.fileService.update({filename: team.image, file: image});
            return team.image;
        } else {
            const fileName: string = await this.fileService.create(image);
            await this.teamRepository.update({image: fileName}, {where: {id}});
            return fileName;
        }
    }

    // DELETE delete image
    async deleteImage(id: number): Promise<{message: string}> {
        const team: TeamModel = await this.getModelById(id);
        await this.fileService.delete(team.image);
        await team.update({image: null});
        return {message: 'success'};
    }

    async getModelById(id: number): Promise<TeamModel> {
        const team: TeamModel = await this.teamRepository.findByPk(id, {include: {all: true}});

        if (!team) {
            throw new HttpException({message: 'Команда с таким id не найден'}, HttpStatus.BAD_REQUEST);
        }

        return team;
    }
}
