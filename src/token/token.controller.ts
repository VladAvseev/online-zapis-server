import {Body, Controller, Post} from '@nestjs/common';
import {TokensDto} from "./dto/token.dto";
import {TokenService} from "./token.service";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Controller('token')
export class TokenController {

    constructor(private tokenService: TokenService) {}

    @Post('/refresh')
    refresh(@Body() body: RefreshTokenDto): Promise<TokensDto> {
            return this.tokenService.refresh(body.refreshToken);
    }
}
