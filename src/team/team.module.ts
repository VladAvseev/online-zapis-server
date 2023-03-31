import {forwardRef, Module} from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TeamModel} from "./model/team.model";
import {TokenModule} from "../token/token.module";
import {TagModule} from "../tag/tag.module";
import {UserModule} from "../user/user.module";
import {UserTeamModel} from "./model/user-team.model";
import {MasterModule} from "../master/master.module";
import {FileModule} from "../file/file.module";

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [
      SequelizeModule.forFeature([TeamModel, UserTeamModel]),
      TokenModule,
      TagModule,
      forwardRef(() => UserModule),
      MasterModule,
      FileModule
  ],
    exports: [TeamService]
})
export class TeamModule {}
