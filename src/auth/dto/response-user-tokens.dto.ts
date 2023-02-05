import {ResponseUserDto} from "../../user/dto/response-user.dto";
import {TokensDto} from "../../token/dto/token.dto";

export class ResponseUserTokensDto {
    readonly user: ResponseUserDto;
    readonly tokens: TokensDto;

    constructor(user: ResponseUserDto, tokens: TokensDto) {
        this.user = user;
        this.tokens = tokens;
    }
}