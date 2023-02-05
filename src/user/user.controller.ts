import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {ResponseUserDto} from "./dto/response-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UpdatePasswordDto} from "./dto/update-password.dto";


@Controller('user')
@UseGuards(JwtAuthGuard)
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

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto): Promise<ResponseUserDto> {
        return this.userService.update(id, userDto);
    }

    @Put('/password/:id')
    updatePassword(@Param('id') id: number, @Body() dto: UpdatePasswordDto): Promise<{ message: string }> {
        return this.userService.updatePassword(id, dto);
    }

    @Post('/role')
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto);
    }

    //todo add controller in future
    @Post('/team/:id')
    addTeam(@Param('id') teamId: number) {

    }
}
