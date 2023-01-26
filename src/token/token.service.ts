import { Injectable } from '@nestjs/common';
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {TokenDto} from "./dto/token.dto";
import {JwtService} from "@nestjs/jwt";
import {SaveTokenDto} from "./dto/save-token.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TokenModel} from "./token.model";

@Injectable()
export class TokenService {

    constructor(@InjectModel(TokenModel) private tokenRepository: typeof TokenModel,
        private jwtService: JwtService) {}

    generateTokens(user: ResponseUserDto): TokenDto {
        return {
            accessToken: this.jwtService.sign({...user}, {expiresIn: '15m', secret: process.env.JWT_ACCES_SECRET}),
            refreshToken: this.jwtService.sign({...user}, {expiresIn: '72h', secret: process.env.JWT_REFRESH_TOKEN})
        }
    }

    async saveToken(tokenDto: SaveTokenDto): Promise<TokenModel> {
        const tokenData: TokenModel = await this.tokenRepository.findOne({
            where: {
                user_id: tokenDto.user_id
            }
        });
        if (tokenData) {
            await tokenData.$set('refresh_token', tokenDto.refresh_token);
            return tokenData;
        }
        const token: TokenModel = await this.tokenRepository.create(tokenDto);
        return token;
    }
}
