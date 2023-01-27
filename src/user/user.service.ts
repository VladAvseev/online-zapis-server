import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./model/user.model";
import {RoleService} from "../role/role.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {RoleModel} from "../role/model/role.model";
import {CityModel} from "../city/model/city.model";
import {CityService} from "../city/city.service";
import {ResponseUserDto} from "./dto/response-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel,
                private roleService: RoleService,
                private cityService: CityService,) {}

    async create(userDto: CreateUserDto): Promise<ResponseUserDto> {
        const user: UserModel = await this.userRepository.create(userDto);
        const role: RoleModel = await this.roleService.getByValue("CLIENT");
        const city: CityModel = await this.cityService.getById(userDto.city_id);
        await user.$set('roles', [role.id]);
        await user.$set('city', city);
        user.city = city;
        user.roles = [role];
        return ResponseUserDto.toResponseUserDto(user);
    }

    async getAll(): Promise<ResponseUserDto[]> {
        const users: UserModel[] = await this.userRepository.findAll({include: {all: true}});
        return users.map(user => ResponseUserDto.toResponseUserDto(user));
    }

    async getById(id: number): Promise<ResponseUserDto> {
        const user: UserModel = await this.userRepository.findByPk(id, {include: {all: true}});
        return ResponseUserDto.toResponseUserDto(user);
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
}
