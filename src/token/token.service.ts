import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {TokenDto} from "./dto/token.dto";
import {JwtService} from "@nestjs/jwt";
import {SaveTokenDto} from "./dto/save-token.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TokenModel} from "./token.model";
import {UserService} from "../user/user.service";

@Injectable()
export class TokenService {

    constructor(@InjectModel(TokenModel) private tokenRepository: typeof TokenModel,
                private jwtService: JwtService,
                private userService: UserService) {}

    generateTokens(user: ResponseUserDto): TokenDto {
        return {
            accessToken: this.jwtService.sign({...user}, {expiresIn: '15m', secret: process.env.JWT_ACCESS_SECRET}),
            refreshToken: this.jwtService.sign({...user}, {expiresIn: '72h', secret: process.env.JWT_REFRESH_SECRET})
        }
    }

    async saveToken(tokenDto: SaveTokenDto): Promise<TokenModel> {
        const tokenData: TokenModel = await this.tokenRepository.findOne({
            where: {
                user_id: tokenDto.user_id
            }
        });
        if (tokenData) {
            await tokenData.set('refresh_token', tokenDto.refresh_token);
            return tokenData;
        }
        const token: TokenModel = await this.tokenRepository.create(tokenDto);
        return token;
    }

    async remove(id: number): Promise<void> {
        await this.tokenRepository.destroy({where: {user_id: id}});
    }

    validateRefreshToken(token: string): ResponseUserDto {
        const userData = this.jwtService.verify(token, {secret: process.env.JWT_REFRESH_SECRET});
        return userData;
    }

    async refresh(refreshToken: string): Promise<TokenDto> {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        const userData = this.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenRepository.findOne({where: {refresh_token: refreshToken}});
        if (!userData || !tokenFromDb) {
            throw new UnauthorizedException();
        }
        const user: ResponseUserDto  = await this.userService.getById(userData.id);
        const tokens: TokenDto = this.generateTokens(user);
        await this.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});
        return tokens;
    }
}
