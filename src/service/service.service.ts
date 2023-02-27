import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ServiceModel} from "./model/service.model";
import {TeamModel} from "../team/model/team.model";
import {TeamService} from "../team/team.service";
import {CreateServiceDto} from "./dto/create-service.dto";
import {UpdateServiceDto} from "./dto/update-service.dto";

@Injectable()
export class ServiceService {
    constructor(@InjectModel(ServiceModel) private serviceRepository: typeof ServiceModel,
                private teamService: TeamService) {}

    async getAll(): Promise<ServiceModel[]> {
        const services: ServiceModel[] = await this.serviceRepository.findAll({include: {all: true}});
        return services;
    }

    async getById(id: number): Promise<ServiceModel> {
        const service: ServiceModel = await this.getModelById(id);
        return service;
    }

    async create(dto: CreateServiceDto): Promise<ServiceModel> {
        if (!dto.title || !dto.description || !dto.currency || !dto.price || !dto.duration || !dto.team_id) {
            throw new HttpException({message: 'Не все поля заполнены'}, HttpStatus.BAD_REQUEST);
        }

        const service: ServiceModel = await this.serviceRepository.create(dto);
        const team: TeamModel = await this.teamService.getModelById(dto.team_id);

        await team.$set('services', [...team.services, service]);

        return service;
    }

    async update(id: number, dto: UpdateServiceDto): Promise<{message: string}> {
        const service: ServiceModel = await this.getModelById(id);

        await service.update(dto);

        return {message: 'success'};
    }

    async delete(id: number): Promise<{message: string}> {
        await this.serviceRepository.destroy({where: {id}});
        return {message: 'success'};
    }

    private async getModelById(id: number): Promise<ServiceModel> {
        const service: ServiceModel = await this.serviceRepository.findByPk(id);

        if (!service) {
            throw new HttpException({message: 'Услуга с таким id не найдена'}, HttpStatus.BAD_REQUEST);
        }

        return service;
    }
}
