import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {RoleModel} from "./role.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Get()
    getAllRoles(): Promise<RoleModel[]> {
        return this.roleService.getAll();
    }

    @Get(':value')
    getRoleById(@Param('value') value: string): Promise<RoleModel> {
        return this.roleService.getByValue(value);
    }

    @Post()
    createRole(@Body() roleDto: CreateRoleDto): Promise<RoleModel> {
        return this.roleService.create(roleDto);
    }
}
