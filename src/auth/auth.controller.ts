import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginUserDto} from "./dto/login-user.dto";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {ResponseUserTokensDto} from "./dto/response-user-tokens.dto";
import {RegistrationUserDto} from "./dto/registration-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: LoginUserDto): Promise<ResponseUserTokensDto> {
        return this.authService.login(dto);
    }

    @Post('/registration')
    registration(@Body() dto: RegistrationUserDto): Promise<ResponseUserTokensDto> {
        return this.authService.registration(dto);
    }

    @Post('/logout')
    @UseGuards(JwtAuthGuard)
    logout(@Body() dto: {user: ResponseUserDto}): Promise<void> {
        return this.authService.logout(dto.user);
    }
}
