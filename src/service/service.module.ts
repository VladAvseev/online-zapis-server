import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ServiceModel} from "./model/service.model";
import {MasterServiceModel} from "./model/master-service.model";
import {TeamModule} from "../team/team.module";
import {TokenModule} from "../token/token.module";

@Module({
  providers: [ServiceService],
  controllers: [ServiceController],
  imports: [
      SequelizeModule.forFeature([ServiceModel, MasterServiceModel]),
      TeamModule,
      TokenModule,
  ],
})
export class ServiceModule {}
