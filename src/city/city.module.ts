import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {CityModel} from "./city.model";
import {UserModel} from "../user/user.model";

@Module({
    controllers: [CityController],
    providers: [CityService],
    imports: [
        SequelizeModule.forFeature([CityModel, UserModel]),
    ],
    exports: [CityService],
})
export class CityModule {}
