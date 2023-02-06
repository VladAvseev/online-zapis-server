import {forwardRef, Module} from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../user/model/user.model";
import {TagModel} from "../tag/model/tag.model";
import {TeamModel} from "./model/team.model";
import {CityModel} from "../city/model/city.model";
import {ServiceModel} from "../service/model/service.model";
import {TeamTagModel} from "../tag/model/team-tag.model";
import {TokenModule} from "../token/token.module";
import {TagModule} from "../tag/tag.module";
import {UserModule} from "../user/user.module";
import {UserTeamModel} from "./model/user-team.model";
import {MasterModule} from "../master/master.module";

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [
      SequelizeModule.forFeature([TeamModel, TagModel, TeamTagModel, UserModel, CityModel, ServiceModel, UserTeamModel]),
      TokenModule,
      TagModule,
      forwardRef(() => UserModule),
      MasterModule,
  ],
    exports: [TeamService]
})
export class TeamModule {}
