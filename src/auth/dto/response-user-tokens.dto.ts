import {ResponseUserDto} from "../../user/dto/response-user.dto";
import {TokensDto} from "../../token/dto/token.dto";
import {UserModel} from "../../user/model/user.model";

export class ResponseUserTokensDto {
    readonly user: ResponseUserDto;
    readonly tokens: TokensDto;

    constructor(user: UserModel, tokens: TokensDto) {
        this.user = new ResponseUserDto(user);
        this.tokens = tokens;
    }
}