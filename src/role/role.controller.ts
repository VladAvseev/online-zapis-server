import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RoleService} from "./role.service";
import {RoleModel} from "./model/role.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Roles} from "../auth/decorator/roles-auth.decorator";
import {RolesAuthGuard} from "../auth/guard/roles-auth.guard";

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Get()
    @Roles("ADMIN")
    @UseGuards(RolesAuthGuard)
    getAllRoles(): Promise<RoleModel[]> {
        return this.roleService.getAll();
    }

    @Get(':value')
    @Roles("ADMIN")
    @UseGuards(RolesAuthGuard)
    getRoleById(@Param('value') value: string): Promise<RoleModel> {
        return this.roleService.getByValue(value);
    }

    @Post()
    @Roles("ADMIN")
    @UseGuards(RolesAuthGuard)
    createRole(@Body() roleDto: CreateRoleDto): Promise<RoleModel> {
        return this.roleService.create(roleDto);
    }
}
