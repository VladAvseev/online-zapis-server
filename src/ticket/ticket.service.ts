import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TicketModel} from "./model/ticket.model";

@Injectable()
export class TicketService {
    constructor(@InjectModel(TicketModel) private ticketRepository: typeof TicketModel) {}
}
