import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../user/model/user.model";
import {TicketModel} from "./model/ticket.model";
import {MasterServiceModel} from "../service/model/master-service.model";

@Module({
  providers: [TicketService],
  controllers: [TicketController],
  imports: [
    SequelizeModule.forFeature([TicketModel, UserModel, MasterServiceModel]),
  ]
})
export class TicketModule {}
