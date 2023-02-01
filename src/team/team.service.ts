import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TeamModel} from "./model/team.model";
import {CreateTeamDto} from "./dto/create-team.dto";
import {TagModel} from "../tag/model/tag.model";
import {TagService} from "../tag/tag.service";
import {UserModel} from "../user/model/user.model";
import {UserService} from "../user/user.service";
import {UpdateTeamDto} from "./dto/update-team.dto";

@Injectable()
export class TeamService {
    constructor(@InjectModel(TeamModel) private teamRepository: typeof TeamModel,
                private tagService: TagService,
                private userService: UserService) {}

    async getAll(): Promise<TeamModel[]> {
        return this.teamRepository.findAll({include: {all: true}});
    }

    async getById(id: number): Promise<TeamModel> {
        const team: TeamModel = await this.teamRepository.findByPk(id, {include: {all: true}});

        if (!team) {
            throw new HttpException('Команда с таким id не найден', HttpStatus.BAD_REQUEST);
        }

        return team;
    }

    async create(dto: CreateTeamDto): Promise<TeamModel> {
        if (!dto.title || !dto.email || !dto.city_id) {
            throw new HttpException({message: 'Не все обязательные поля заполнены'}, HttpStatus.BAD_REQUEST);
        }

        const team: TeamModel = await this.teamRepository.create(dto);

        const tags: TagModel[] = await this.tagService.addTags(dto.tags);
        await team.$set('tags', tags);

        const admin: UserModel = await this.userService.getById(dto.admin_id);
        await team.$set('users', [admin]);

        team.users = [admin];
        team.tags = tags;
        return team;
    }

    async update(id: number, dto: UpdateTeamDto): Promise<TeamModel> {
        if (!dto.team.title || !dto.team.email || !dto.team.city_id) {
            throw new HttpException({message: 'Не все обязательные поля заполнены'}, HttpStatus.BAD_REQUEST);
        }

        await this.teamRepository.update(dto.team, {where: {id}})

        const tags: TagModel[] = await this.tagService.addTags(dto.tags);
        console.log(tags);
        const team: TeamModel = await this.getById(id);
        await team.$set('tags', tags);
        team.tags = tags;
        return team;
    }
}
