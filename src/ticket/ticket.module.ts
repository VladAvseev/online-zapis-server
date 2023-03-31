import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {TicketModel} from "./model/ticket.model";

@Module({
  providers: [TicketService],
  controllers: [TicketController],
  imports: [
    SequelizeModule.forFeature([TicketModel]),
  ]
})
export class TicketModule {}
