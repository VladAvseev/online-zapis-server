import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {RoleModel} from "./model/role.model";
import {UserModel} from "../user/model/user.model";
import {UserRoleModel} from "./model/user-role.model";

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
      SequelizeModule.forFeature([RoleModel, UserModel, UserRoleModel]),
  ],
  exports: [RoleService],
})
export class RoleModule {}
