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
import {ResponseUserTeamDto} from "./dto/response-user-team.dto";
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {ResponseTagDto} from "../tag/dto/response-tag.dto";
import {FileModel} from "../file/model/file.model";

@Injectable()
export class TeamService {

    TABLE = 'team';
    constructor(@InjectModel(TeamModel) private teamRepository: typeof TeamModel,
                private tagService: TagService,
                @Inject(forwardRef(() => UserService))
                private userService: UserService,
                private masterService: MasterService,
                private fileService: FileService) {}

    // POST: get all teams in current town (search)
    async getAll(dto: {city_id: number, search: string}): Promise<ResponseUserTeamDto[]> {
        const teams: TeamModel[] = await this.teamRepository.findAll({include: {all: true}});
        const filterTeams: TeamModel[] = teams.filter(team => {
            if (!dto.city_id || team.city.id === +dto.city_id) {
                if (!dto.search) {
                    return true;
                }
                let isSearched = false;
                team.tags.forEach(tag => {
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
        return filterTeams.map(team => new ResponseUserTeamDto(team));
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
    async create(dto: CreateTeamDto): Promise<ResponseTeamDto> {
        const master: MasterModel = await this.masterService.getModelById(dto.admin_id);

        if (master) {
            throw new HttpException({message: 'Вы уже состоите в команде'}, HttpStatus.BAD_REQUEST);
        }

        if (!dto.title || !dto.email || !dto.city_id) {
            throw new HttpException({message: 'Не все обязательные поля заполнены'}, HttpStatus.BAD_REQUEST);
        }

        const team: TeamModel = await this.teamRepository.create(dto);

        const tags: TagModel[] = await this.tagService.addTags(dto.tags);
        await team.$set('tags', tags);
        team.tags = tags;

        await this.masterService.create(dto.admin_id, team.id);

        return new ResponseTeamDto(team);
    }

    // PUT update team info
    async update(id: number, dto: UpdateTeamDto): Promise<ResponseTeamDto> {
        await this.teamRepository.update(dto, {where: {id}})
        const updatedTeam: TeamModel = await this.getModelById(id);
        return new ResponseTeamDto(updatedTeam);
    }

    // DELETE delete team
    async delete(id: number): Promise<{message: string}> {
        const team: TeamModel = await this.getModelById(id);
        await this.teamRepository.destroy({where: {id}});
        await this.deleteImage(id);
        return {message: 'success'};
    }

    // POST add tag
    async addTag(id: number, dto: string): Promise<ResponseTagDto[]> {
        const [tag]: TagModel[] = await this.tagService.addTags([dto]);
        const team: TeamModel = await this.getModelById(id);
        if (!team.tags.filter((tag) => tag.value === dto).length) {
            await team.$set('tags', [...team.tags, tag]);
        } else {
            throw new HttpException({message: 'Такой тег уже присутствует'}, HttpStatus.BAD_REQUEST);
        }
        return [...team.tags, tag].map(tag => new ResponseTagDto(tag));
    }

    // DELETE delete tag
    async deleteTag(id: number, dto: CreateTagDto): Promise<ResponseTagDto[]> {
        const tagModel: TagModel = await this.tagService.getByValue(dto.value);
        if (!tagModel) {
            throw new HttpException({message: 'Такого тега нет'}, HttpStatus.BAD_REQUEST);
        }
        const team: TeamModel = await this.getModelById(id);
        await team.$remove('tags', tagModel);
        return team.tags.filter(tag => tag.value !== tagModel.value).map(tag => new ResponseTagDto(tag));
    }

    // PUT update image
    async updateImage(id: number, image: any): Promise<{ message: string }> {
        const fileBinary = await this.fileService.get({essence_table: this.TABLE, essence_id: id});
        if (fileBinary) {
            await this.fileService.update({essence_table: this.TABLE, essence_id: id, file: image.buffer})
        } else {
            await this.fileService.create({essence_table: this.TABLE, essence_id: id, file: image.buffer});
        }
        return {message: 'success'};
    }

    // DELETE delete image
    async deleteImage(id: number): Promise<{message: string}> {
        await this.fileService.delete({essence_table: this.TABLE, essence_id: id});
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
