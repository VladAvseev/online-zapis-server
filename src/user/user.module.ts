import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {RoleModule} from "../role/role.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserRoleModel} from "../role/model/user-role.model";
import {CityModel} from "../city/model/city.model";
import {RoleModel} from "../role/model/role.model";
import {UserModel} from "./model/user.model";
import {CityModule} from "../city/city.module";
import {TokenModule} from "../token/token.module";
import {TeamModel} from "../team/model/team.model";
import {MasterModel} from "../master/model/master.model";
import {TicketModel} from "../ticket/model/ticket.model";
import {UserTeamModel} from "../team/model/user-team.model";
import {TeamModule} from "../team/team.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([UserModel, RoleModel, UserRoleModel, CityModel, TeamModel, MasterModel, TicketModel, UserTeamModel]),
        RoleModule,
        forwardRef(() => TokenModule),
        CityModule,
        forwardRef(() => TeamModule)
    ],
    exports: [UserService],
})
export class UserModule {}
