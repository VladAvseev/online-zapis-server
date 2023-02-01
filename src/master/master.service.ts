import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {MasterModel} from "./model/master.model";

@Injectable()
export class MasterService {
    constructor(@InjectModel(MasterModel) private masterRepository: typeof MasterModel) {}
}
