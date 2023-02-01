import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ServiceModel} from "./model/service.model";

@Injectable()
export class ServiceService {
    constructor(@InjectModel(ServiceModel) private serviceRepository: typeof ServiceModel) {}
}
