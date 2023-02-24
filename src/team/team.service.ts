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

@Injectable()
export class TeamService {
    constructor(@InjectModel(TeamModel) private teamRepository: typeof TeamModel,
                private tagService: TagService,
                @Inject(forwardRef(() => UserService))
                private userService: UserService,
                private masterService: MasterService,
                private fileService: FileService) {}

    // POST: get all teams in current town
    async getAll(dto: {cityId: number, search: string}): Promise<ResponseTeamDto[]> {
        const teams: TeamModel[] = await this.teamRepository.findAll({include: {all: true}});
        const filterTeams: TeamModel[] = teams.filter(team => {
            if (team.city.id === dto.cityId) {
                let isSearched = false;
                team.tags.forEach(tag => {
                    if (tag.value.toLowerCase().includes(dto.search.toLowerCase())) {
                        isSearched = true;
                    }
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
    async update(id: number, dto: UpdateTeamDto, tagsDto: string[]): Promise<ResponseTeamDto> {
        await this.teamRepository.update(dto, {where: {id}})

        const tags: TagModel[] = await this.tagService.addTags(tagsDto);
        const updatedTeam: TeamModel = await this.getModelById(id);
        await updatedTeam.$set('tags', tags);
        updatedTeam.tags = tags;
        return new ResponseTeamDto(updatedTeam);
    }

    // PUT update image
    async updateImage(id: number, image: any): Promise<{message: string}> {
        const team: TeamModel = await this.getModelById(id);
        const fileName: string = await this.fileService.createFile(image, team.image);
        await this.teamRepository.update({image: fileName}, {where: {id}});
        return {message: 'success'};
    }

    // DELETE delete image
    async deleteImage(id: number): Promise<{message: string}> {
        const team: TeamModel = await this.getModelById(id);
        await this.fileService.deleteFile(team.image);
        await team.$set('image', null);
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
