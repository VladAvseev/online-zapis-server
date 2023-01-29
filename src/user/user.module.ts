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

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([UserModel, RoleModel, UserRoleModel, CityModel]),
        RoleModule,
        TokenModule,
        CityModule,
    ],
    exports: [UserService],
})
export class UserModule {}
