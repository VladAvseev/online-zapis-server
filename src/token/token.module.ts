import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [JwtModule],
  exports: [TokenService],
})
export class TokenModule {}
