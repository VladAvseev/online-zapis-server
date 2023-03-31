import {Module} from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {CityModel} from "./model/city.model";
import {TokenModule} from "../token/token.module";;

@Module({
    controllers: [CityController],
    providers: [CityService],
    imports: [
        SequelizeModule.forFeature([CityModel]),
        TokenModule
    ],
    exports: [CityService],
})
export class CityModule {}
