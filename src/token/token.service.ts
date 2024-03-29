import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ResponseUserDto} from "../user/dto/response-user.dto";
import {TokensDto} from "./dto/token.dto";
import {JwtService} from "@nestjs/jwt";
import {SaveTokenDto} from "./dto/save-token.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TokenModel} from "./model/token.model";
import {UserService} from "../user/user.service";
import {UserDataForTokenDto} from "./dto/user-data-for-token.dto";
import {UserModel} from "../user/model/user.model";

@Injectable()
export class TokenService {

    constructor(@InjectModel(TokenModel) private tokenRepository: typeof TokenModel,
                private jwtService: JwtService,
                private userService: UserService) {}

    generateTokens(user: UserModel): TokensDto {
        const data = new UserDataForTokenDto(user);
        return {
            accessToken: this.jwtService.sign({...data}, {expiresIn: '15m', secret: process.env.JWT_ACCESS_SECRET}),
            refreshToken: this.jwtService.sign({...data}, {expiresIn: '72h', secret: process.env.JWT_REFRESH_SECRET})
        }
    }

    async saveToken(tokenDto: SaveTokenDto): Promise<TokenModel> {
        await this.remove(tokenDto.user_id);
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

    validateAccessToken(token: string): ResponseUserDto {
        const userData = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
        return userData;
    }

    async refresh(refreshToken: string): Promise<TokensDto> {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        //check current token
        const userData = this.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenRepository.findOne({where: {refresh_token: refreshToken}});
        if (!userData || !tokenFromDb) {
            throw new UnauthorizedException();
        }

        //create new tokens with last data
        const user: UserModel  = await this.userService.getModelById(userData.id);
        const tokens: TokensDto = this.generateTokens(user);
        await this.saveToken({user_id: user.id, refresh_token: tokens.refreshToken});
        return tokens;
    }
}
