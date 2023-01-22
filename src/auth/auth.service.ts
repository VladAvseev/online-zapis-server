import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {UserModel} from "../user/user.model";
import {ResponseUserDto} from "../user/dto/response-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    async login(userDto: LoginUserDto): Promise<{token: string}> {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getByEmail(userDto.email);
        if (candidate) {
            throw new HttpException({message: 'Пользователь с таким email уже существует'}, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private generateToken(user: ResponseUserDto): {token: string} {
        return {
            token: this.jwtService.sign({...user})
        }
    }

    private async validateUser(userDto: LoginUserDto): Promise<ResponseUserDto> {
        const user = await this.userService.getByEmail(userDto.email);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return ResponseUserDto.toResponseUserDto(user);
            }
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
