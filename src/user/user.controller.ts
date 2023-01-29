import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {ResponseUserDto} from "./dto/response-user.dto";
import {Roles} from "../auth/decorator/roles-auth.decorator";
import {RolesAuthGuard} from "../auth/guard/roles-auth.guard";
import {AddRoleDto} from "./dto/add-role.dto";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
     getAllUsers(): Promise<ResponseUserDto[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getUserById(@Param('id') id: number): Promise<ResponseUserDto> {
        return this.userService.getById(id);
    }

    @Post('/role')
    @Roles("ADMIN")
    @UseGuards(RolesAuthGuard)
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto);
    }
}
