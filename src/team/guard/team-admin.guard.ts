import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import {Observable} from "rxjs";
import {TokenService} from "../../token/token.service";
import {TeamService} from "../team.service";
import {TeamModel} from "../model/team.model";

@Injectable()
export class TeamAdminGuard implements CanActivate {
    constructor(private tokenService: TokenService,
                private teamService: TeamService) {}

    async canActivate(context: ExecutionContext){
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
            }
            const user = this.tokenService.validateAccessToken(token);
            const team: TeamModel = await this.teamService.getModelById(req.params.id);
            return user.id === team.admin_id;
        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}