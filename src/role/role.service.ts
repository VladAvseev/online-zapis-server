import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RoleModel} from "./model/role.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RoleService {
    constructor(@InjectModel(RoleModel) private roleRepository: typeof RoleModel) {}

    async getAll(): Promise<RoleModel[]> {
        const roles: RoleModel[] = await this.roleRepository.findAll();
        return roles;
    }

    async getByValue(value: string): Promise<RoleModel> {
        const role: RoleModel = await this.roleRepository.findOne({
            where: {
                value,
            },
        });
        if (!role) {
            throw new HttpException({message: 'Роль не найдена'}, HttpStatus.BAD_REQUEST);
        }
        return role;
    }

    async create(dto: CreateRoleDto): Promise<RoleModel> {
        const candidate: RoleModel = await this.getByValue(dto.value);
        if (candidate) {
            throw new HttpException({message: `Роль ${dto.value} уже существует`}, HttpStatus.BAD_REQUEST);
        }
        const role: RoleModel = await this.roleRepository.create(dto);
        return role;
    }
}
