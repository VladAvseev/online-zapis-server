import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {TokenService} from "../../token/token.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private tokenService: TokenService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException();
            }
            const user = this.tokenService.validateAccessToken(token);
            return true;
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException();
        }
    }
}