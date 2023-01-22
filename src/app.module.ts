import {Module} from '@nestjs/common';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { RoleModule } from './role/role.module';
import { CityModule } from './city/city.module';
import {CityModel} from "./city/city.model";
import {RoleModel} from "./role/role.model";
import {UserModel} from "./user/user.model";
import {UserRoleModel} from "./role/user-role.model";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_URL,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          models: [UserModel, CityModel, RoleModel, UserRoleModel],
          autoLoadModels: true,
      }),
      UserModule,
      RoleModule,
      CityModule,
      AuthModule,
  ],
})
export class AppModule {}
