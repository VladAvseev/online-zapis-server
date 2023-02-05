import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {MasterModel} from "./model/master.model";

@Injectable()
export class MasterService {
    constructor(@InjectModel(MasterModel) private masterRepository: typeof MasterModel) {}

    async invite(email: string): Promise<{message: string}> {
        return {message: 'success'};
    }

    async create(userId: number): Promise<MasterModel> {
        const master: MasterModel = await this.masterRepository.create({id: userId});
        return master;
    }
}
