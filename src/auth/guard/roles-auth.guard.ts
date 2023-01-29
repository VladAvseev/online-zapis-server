import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {TokenService} from "../../token/token.service";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorator/roles-auth.decorator";

@Injectable()
export class RolesAuthGuard implements CanActivate {
    constructor(private tokenService: TokenService,
                private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
            }
            const user = this.tokenService.validateAccessToken(token);
            req.user = {...user};
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}