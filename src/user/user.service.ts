import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./model/user.model";
import {RoleService} from "../role/role.service";
import {RoleModel} from "../role/model/role.model";
import {CityModel} from "../city/model/city.model";
import {CityService} from "../city/city.service";
import {ResponseUserDto} from "./dto/response-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UpdatePasswordDto} from "./dto/update-password.dto";
import * as bcrypt from "bcryptjs";
import {RegistrationUserDto} from "../auth/dto/registration-user.dto";
import {TeamModel} from "../team/model/team.model";
import {TeamService} from "../team/team.service";
import {log} from "util";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel,
                private roleService: RoleService,
                private cityService: CityService,
                private teamService: TeamService) {}

    // GET: get user by id controller
    async getById(id: number): Promise<ResponseUserDto> {
        const user: UserModel = await this.userRepository.findByPk(id, {include: {all: true}});
        if (!user) {
            throw new HttpException('Пользователь с таким id не найден', HttpStatus.BAD_REQUEST);
        }
        return new ResponseUserDto(user);
    }

    // PUT: update user
    async update(id: number, dto: UpdateUserDto): Promise<ResponseUserDto> {
        const candidate: ResponseUserDto = await this.getById(id);
        if (dto.email !== candidate.email) {
            const candidate = await this.getByEmail(dto.email);
            if (candidate) {
                throw new HttpException({massage: "Пользователь с такой почтой уже существует"}, HttpStatus.BAD_REQUEST);
            }
        }
        if (dto.phone !== candidate.phone) {
            const candidate = await this.getByEmail(dto.email);
            if (candidate) {
                throw new HttpException({massage: "Пользователь с таким телефоном уже существует"}, HttpStatus.BAD_REQUEST);
            }
        }
        if (dto.city_id !== candidate.city.id) {
            await this.cityService.getById(dto.city_id);
        }
        await this.userRepository.update(dto, {where: {id}});
        const user: ResponseUserDto = await this.getById(id);
        return user;
    }

    // PUT: update users password
    async updatePassword(id, dto: UpdatePasswordDto): Promise<{message: string}> {
        const user: UserModel = await this.getModelById(id);
        const passwordEquals = await bcrypt.compare(dto.oldPassword, user.password);
        if (!passwordEquals) {
            throw new HttpException({message: 'Неверный пароль'}, HttpStatus.BAD_REQUEST)
        }
        const newHashPassword = await bcrypt.hash(dto.newPassword, 5);
        await this.userRepository.update({password: newHashPassword}, {where: {id}});
        return {message: 'success'}
    }

    // POST: add new role to user
    async addRole(dto: AddRoleDto): Promise<ResponseUserDto> {
        const user: UserModel = await this.getModelById(dto.userId);
        const role: RoleModel = await this.roleService.getByValue(dto.value);
        if (!user || !role) {
            throw new HttpException({message: 'Роль или Пользователь не существуют'}, HttpStatus.BAD_REQUEST);
        }
        const userRoles: string[] = user.roles.map(role => {return role.value}) || [];
        if (userRoles.includes(dto.value)) {
            throw new HttpException({message: 'Выбранный пользователь уже имеет эту роль'}, HttpStatus.BAD_REQUEST)
        }
        await user.$add('role', role.id);
        user.roles.push(role);
        return new ResponseUserDto(user);
    }

    // POST: add team to user saves
    async addTeam(teamId: number, dto: ResponseUserDto): Promise<{message: string}> {
        const user: UserModel = await this.getModelById(dto.id);
        const team: TeamModel = await this.teamService.getModelById(teamId);
        if (user.teams.map(team => team.id).includes(team.id)) {
            throw new HttpException({message: 'Команда уже добавлена в избранное'}, HttpStatus.BAD_REQUEST);
        }
        await user.$add('team', team.id);
        return {message: 'success'}
    }

    // DELETE: remove team from user saves
    async removeTeam(teamId: number, dto: ResponseUserDto): Promise<{message: string}> {
        const user: UserModel = await this.getModelById(dto.id);
        const team: TeamModel = await this.teamService.getModelById(teamId);
        if (!user.teams.map(team => team.id).includes(team.id)) {
            throw new HttpException({message: 'Данной команды нет в избранном'}, HttpStatus.BAD_REQUEST);
        }
        await user.$remove('team', team.id);
        return {message: 'success'}
    }

    async create(dto: RegistrationUserDto): Promise<ResponseUserDto> {
        const user: UserModel = await this.userRepository.create(dto);
        const role: RoleModel = await this.roleService.getByValue("CLIENT");
        const city: CityModel = await this.cityService.getById(dto.city_id);
        await user.$set('roles', [role.id]);
        await user.$set('city', city);
        user.city = city;
        user.roles = [role];
        return new ResponseUserDto(user);
    }

    async getAll(): Promise<ResponseUserDto[]> {
        const users: UserModel[] = await this.userRepository.findAll({include: {all: true}});
        return users.map(user => new ResponseUserDto(user));
    }

    async getModelById(id: number): Promise<UserModel> {
        const user: UserModel = await this.userRepository.findByPk(id, {include: {all: true}});
        if (!user) {
            throw new HttpException({message: 'Пользователь с таким id не найден'}, HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    async getByEmail(email: string): Promise<UserModel> {
        const user: UserModel = await this.userRepository.findOne({
            where: {
                email,
            },
            include: {
                all: true
            }
        });
        return user;
    }

    async getByPhone(phone: string): Promise<UserModel> {
        const user: UserModel = await this.userRepository.findOne({
            where: {
                phone,
            },
            include: {
                all: true
            }
        });
        return user;
    }
}
