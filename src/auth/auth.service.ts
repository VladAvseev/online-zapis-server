import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import * as bcrypt from "bcryptjs";
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {TokensDto} from "../token/dto/token.dto";
import {TokenService} from "../token/token.service";
import {ResponseUserTokensDto} from "./dto/response-user-tokens.dto";
import {UserModel} from "../user/model/user.model";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private tokenService: TokenService) {}

    async login(userDto: LoginUserDto): Promise<ResponseUserTokensDto> {
        const user: ResponseUserDto = await this.validateUser(userDto);

        const tokens: TokensDto = this.tokenService.generateTokens(user);
        await this.tokenService.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});

        return new ResponseUserTokensDto(user, tokens);
    }

    async registration(userDto: CreateUserDto): Promise<ResponseUserTokensDto> {
        let candidate;
        try {
            candidate = await this.userService.getByEmail(userDto.email);
        } catch (e) {}

        if (!userDto.name || !userDto.email || !userDto.phone || !userDto.city_id || !userDto.password) {
            throw new HttpException({message: 'Не все поля заполнены'}, HttpStatus.BAD_REQUEST);
        }

        if (candidate) {
            throw new HttpException({message: 'Пользователь с таким email уже существует'}, HttpStatus.BAD_REQUEST);
        }

        try {
            candidate = await this.userService.getByPhone(userDto.email);
        } catch (e) {}

        if (candidate) {
            throw new HttpException({message: 'Пользователь с таким номером телефона уже существует'}, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hashPassword});

        const tokens: TokensDto = this.tokenService.generateTokens(user);
        await this.tokenService.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});

        return new ResponseUserTokensDto(user, tokens);
    }

    async logout(userDto: ResponseUserDto): Promise<void> {
        await this.tokenService.remove(userDto.id);
    }

    private async validateUser(userDto: LoginUserDto): Promise<ResponseUserDto> {
        const user: UserModel = await this.userService.getByEmail(userDto.email);
        if (!user) {
            throw new HttpException({message: 'Пользователь с таким email не найден'}, HttpStatus.BAD_REQUEST)
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (passwordEquals) {
            return ResponseUserDto.toResponseUserDto(user);
        }
        throw new HttpException({message: 'Неверный пароль'}, HttpStatus.BAD_REQUEST)
    }
}
