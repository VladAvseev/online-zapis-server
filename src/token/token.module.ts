import {forwardRef, Module} from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import {JwtModule} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {TokenModel} from "./token.model";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
      JwtModule,
      forwardRef(() => UserModule),
      SequelizeModule.forFeature([TokenModel]),
  ],
  exports: [TokenService],
})
export class TokenModule {}
