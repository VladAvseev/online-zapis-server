import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {RoleModule} from "../role/role.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./model/user.model";
import {CityModule} from "../city/city.module";
import {TokenModule} from "../token/token.module";
import {TeamModule} from "../team/team.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([UserModel]),
        RoleModule,
        forwardRef(() => TokenModule),
        CityModule,
        forwardRef(() => TeamModule)
    ],
    exports: [UserService],
})
export class UserModule {}
