import {Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {RoleModule} from "../role/role.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserRoleModel} from "../role/user-role.model";
import {CityModel} from "../city/city.model";
import {RoleModel} from "../role/role.model";
import {UserModel} from "./user.model";
import {CityModule} from "../city/city.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([UserModel, RoleModel, UserRoleModel, CityModel]),
        RoleModule,
        CityModule,
    ],
    exports: [UserService],
})
export class UserModule {}
