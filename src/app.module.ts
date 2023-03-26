import {Module} from '@nestjs/common';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { RoleModule } from './role/role.module';
import { CityModule } from './city/city.module';
import {CityModel} from "./city/model/city.model";
import {RoleModel} from "./role/model/role.model";
import {UserModel} from "./user/model/user.model";
import {UserRoleModel} from "./role/model/user-role.model";
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import {TokenModel} from "./token/model/token.model";
import { TeamModule } from './team/team.module';
import { TagModule } from './tag/tag.module';
import {TeamModel} from "./team/model/team.model";
import {TagModel} from "./tag/model/tag.model";
import {TeamTagModel} from "./tag/model/team-tag.model";
import { MasterModule } from './master/master.module';
import { ServiceModule } from './service/service.module';
import { TicketModule } from './ticket/ticket.module';
import {MasterModel} from "./master/model/master.model";
import {ServiceModel} from "./service/model/service.model";
import {MasterServiceModel} from "./service/model/master-service.model";
import {TicketModel} from "./ticket/model/ticket.model";
import {UserTeamModel} from "./team/model/user-team.model";
import { FileModule } from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { MailModule } from './mail/mail.module';
import * as path from "path";
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import * as process from "process";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static'),
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_URL,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          models: [
              UserModel,
              CityModel,
              RoleModel,
              UserRoleModel,
              TokenModel,
              TeamModel,
              TagModel,
              TeamTagModel,
              MasterModel,
              ServiceModel,
              MasterServiceModel,
              TicketModel,
              UserTeamModel
          ],
          autoLoadModels: true,
      }),
      UserModule,
      RoleModule,
      CityModule,
      AuthModule,
      TokenModule,
      TeamModule,
      TagModule,
      MasterModule,
      ServiceModule,
      TicketModule,
      FileModule,
      MailModule,
  ],
})
export class AppModule {}
