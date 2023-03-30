import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {FileModel} from "./model/file.model";

@Module({
  imports: [
    SequelizeModule.forFeature([FileModel]),
  ],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController]
})
export class FileModule {}
