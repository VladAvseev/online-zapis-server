import { Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {MasterModel} from "./model/master.model";
import {TokenModule} from "../token/token.module";
import {FileModule} from "../file/file.module";

@Module({
  controllers: [MasterController],
  providers: [MasterService],
  imports: [
      SequelizeModule.forFeature([MasterModel]),
      TokenModule,
      FileModule,
  ],
    exports: [MasterService]
})
export class MasterModule {}
