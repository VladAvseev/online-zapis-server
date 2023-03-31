import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TokenModule} from "../token/token.module";
import {TagModel} from "./model/tag.model";
import {TeamTagModel} from "./model/team-tag.model";

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [
    SequelizeModule.forFeature([TagModel, TeamTagModel]),
    TokenModule,
  ],
  exports: [TagService]
})
export class TagModule {}
