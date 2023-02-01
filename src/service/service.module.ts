import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ServiceModel} from "./model/service.model";
import {MasterModel} from "../master/model/master.model";
import {MasterServiceModel} from "./model/master-service.model";
import {TeamModel} from "../team/model/team.model";

@Module({
  providers: [ServiceService],
  controllers: [ServiceController],
  imports: [
    SequelizeModule.forFeature([ServiceModel, MasterModel, MasterServiceModel, TeamModel])
  ],
})
export class ServiceModule {}