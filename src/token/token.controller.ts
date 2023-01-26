import {Body, Controller, Post} from '@nestjs/common';
import {TokenDto} from "./dto/token.dto";
import {TokenService} from "./token.service";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Controller('token')
export class TokenController {

    constructor(private tokenService: TokenService) {}

    @Post('/refresh')
    refresh(@Body() body: RefreshTokenDto): Promise<TokenDto> {
            return this.tokenService.refresh(body.refreshToken);
    }
}
