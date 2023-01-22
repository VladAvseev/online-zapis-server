import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ResponseUserDto} from "./dto/response-user.dto";


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
}
