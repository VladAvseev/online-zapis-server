import {forwardRef, Module} from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import {JwtModule} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {TokenModel} from "./model/token.model";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
      SequelizeModule.forFeature([TokenModel]),
      JwtModule,
      forwardRef(() => UserModule),
  ],
  exports: [TokenService],
})
export class TokenModule {}
