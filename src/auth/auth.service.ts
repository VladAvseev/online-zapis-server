import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {UserService} from "../user/user.service";
import * as bcrypt from "bcryptjs";
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {TokensDto} from "../token/dto/token.dto";
import {TokenService} from "../token/token.service";
import {ResponseUserTokensDto} from "./dto/response-user-tokens.dto";
import {UserModel} from "../user/model/user.model";
import {RegistrationUserDto} from "./dto/registration-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private tokenService: TokenService) {}

    async registration(dto: RegistrationUserDto): Promise<ResponseUserTokensDto> {
        if (!dto.name || !dto.email || !dto.phone || !dto.city_id || !dto.password) {
            throw new HttpException({message: 'Не все поля заполнены'}, HttpStatus.BAD_REQUEST);
        }

        let candidate;
        candidate = await this.userService.getByEmail(dto.email);
        if (candidate) {
            throw new HttpException({message: 'Пользователь с таким email уже зарегистрирован'}, HttpStatus.BAD_REQUEST);
        }

        candidate = await this.userService.getByPhone(dto.phone);
        if (candidate) {
            throw new HttpException({message: 'Пользователь с таким номером телефона уже существует'}, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(dto.password, 5);

        const user: UserModel = await this.userService.create({...dto, password: hashPassword});

        const tokens: TokensDto = this.tokenService.generateTokens(user);
        await this.tokenService.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});

        return new ResponseUserTokensDto(user, tokens);
    }

    async login(dto: LoginUserDto): Promise<ResponseUserTokensDto> {
        const user: UserModel = await this.validateUser(dto);

        const tokens: TokensDto = this.tokenService.generateTokens(user);
        await this.tokenService.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});

        return new ResponseUserTokensDto(user, tokens);
    }

    async logout(id: number): Promise<{message: string}> {
        await this.tokenService.remove(id);
        return {message: 'success'}
    }

    private async validateUser(dto: LoginUserDto): Promise<UserModel> {
        const user: UserModel = await this.userService.getByEmail(dto.email);
        if (!user) {
            throw new HttpException({message: 'Пользователь с таким mail не найден'}, HttpStatus.BAD_REQUEST)
        }
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (passwordEquals) {
            return user;
        }
        throw new HttpException({message: 'Неверный пароль'}, HttpStatus.BAD_REQUEST)
    }
}
