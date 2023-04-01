import {Body, Controller, Param, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginUserDto} from "./dto/login-user.dto";
import {ResponseUserTokensDto} from "./dto/response-user-tokens.dto";
import {RegistrationUserDto} from "./dto/registration-user.dto";
import {UserIdAuthGuard} from "./guard/user_id-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/registration')
    registration(@Body() dto: RegistrationUserDto): Promise<ResponseUserTokensDto> {
        return this.authService.registration(dto);
    }

    @Post('/login')
    login(@Body() dto: LoginUserDto): Promise<ResponseUserTokensDto> {
        return this.authService.login(dto);
    }

    @Post('/logout/:id')
    @UseGuards(UserIdAuthGuard)
    logout(@Param('id') id: number): Promise<{message: string}> {
        return this.authService.logout(id);
    }
}
