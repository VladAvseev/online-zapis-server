import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import * as bcrypt from "bcryptjs";
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {TokenDto} from "../token/dto/token.dto";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private tokenService: TokenService) {}

    async login(userDto: LoginUserDto): Promise<ResponseUserDto> {
        const user = await this.validateUser(userDto);
        const tokens: TokenDto = this.tokenService.generateTokens(user);
        await this.tokenService.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});
        return {...tokens, ...user};
    }

    async registration(userDto: CreateUserDto): Promise<ResponseUserDto> {
        const candidate = await this.userService.getByEmail(userDto.email);
        if (candidate) {
            throw new HttpException({message: 'Пользователь с таким email уже существует'}, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hashPassword});
        const tokens: TokenDto = this.tokenService.generateTokens(user);
        await this.tokenService.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});
        return {...tokens, ...user};
    }

    async logout(id: number) {
        await this.tokenService.remove(id);
    }

    private async validateUser(userDto: LoginUserDto): Promise<ResponseUserDto> {
        const user = await this.userService.getByEmail(userDto.email);
        if (!user) {
            throw new HttpException('Пользователь с таким email не найден', HttpStatus.BAD_REQUEST)
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (passwordEquals) {
            return ResponseUserDto.toResponseUserDto(user);
        }
        throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST)
    }
}
