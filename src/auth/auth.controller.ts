import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {ResponseUserTokensDto} from "./dto/response-user-tokens.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: LoginUserDto): Promise<ResponseUserTokensDto> {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto): Promise<ResponseUserTokensDto> {
        return this.authService.registration(userDto);
    }

    @Post('/logout')
    @UseGuards(JwtAuthGuard)
    logout(@Body() userDto: {user: ResponseUserDto}): Promise<void> {
        return this.authService.logout(userDto.user);
    }
}
