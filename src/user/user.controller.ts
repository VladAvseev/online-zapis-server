import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {ResponseUserDto} from "./dto/response-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UpdatePasswordDto} from "./dto/update-password.dto";
import {Roles} from "../auth/decorator/roles-auth.decorator";
import {RolesAuthGuard} from "../auth/guard/roles-auth.guard";
import {UserIdAuthGuard} from "../auth/guard/user_id-auth.guard";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllUsers(): Promise<ResponseUserDto[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    @UseGuards(UserIdAuthGuard)
    getUserById(@Param('id') id: number): Promise<ResponseUserDto> {
        return this.userService.getById(id);
    }

    @Put(':id')
    @UseGuards(UserIdAuthGuard)
    updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<ResponseUserDto> {
        return this.userService.update(id, dto);
    }

    @Put('/password/:id')
    @UseGuards(UserIdAuthGuard)
    updatePassword(@Param('id') id: number, @Body() dto: UpdatePasswordDto): Promise<{ message: string }> {
        return this.userService.updatePassword(id, dto);
    }

    @Post('/role')
    @Roles('ADMIN')
    @UseGuards(RolesAuthGuard)
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto);
    }

    @Post(':id/team/:team_id')
    @UseGuards(UserIdAuthGuard)
    addTeam(@Param('id') user_id: number,
            @Param('team_id') team_id: number) {
        return this.userService.addTeam(user_id, team_id);
    }

    @Delete(':id/team/:id')
    @UseGuards(UserIdAuthGuard)
    removeTeam(@Param('id') user_id: number,
               @Param('team_id') team_id: number) {
        return this.userService.removeTeam(user_id, team_id);
    }
}
