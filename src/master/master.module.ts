import { Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {MasterModel} from "./model/master.model";
import {ServiceModel} from "../service/model/service.model";
import {MasterServiceModel} from "../service/model/master-service.model";
import {UserModel} from "../user/model/user.model";
import {TokenModule} from "../token/token.module";
import {FileModule} from "../file/file.module";

@Module({
  controllers: [MasterController],
  providers: [MasterService],
  imports: [
      SequelizeModule.forFeature([MasterModel, UserModel, ServiceModel, MasterServiceModel]),
      TokenModule,
      FileModule,
  ],
    exports: [MasterService]
})
export class MasterModule {}
