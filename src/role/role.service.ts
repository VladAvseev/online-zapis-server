import { Injectable } from '@nestjs/common';
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
        return role;
    }

    async create(roleDto: CreateRoleDto): Promise<RoleModel> {
        const role: RoleModel = await this.roleRepository.create(roleDto);
        return role;
    }
}
