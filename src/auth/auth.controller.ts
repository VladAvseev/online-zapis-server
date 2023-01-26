import {Body, Controller, Param, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import {TokenDto} from "../token/dto/token.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: LoginUserDto): Promise<TokenDto> {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto): Promise<TokenDto> {
        return this.authService.registration(userDto);
    }

    @Post('/logout/:id')
    @UseGuards(JwtAuthGuard)
    logout(@Param('id') id: number): Promise<void> {
        return this.authService.logout(id);
    }
}
