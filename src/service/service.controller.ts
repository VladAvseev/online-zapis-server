import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ServiceService} from "./service.service";
import {ServiceModel} from "./model/service.model";
import {CreateServiceDto} from "./dto/create-service.dto";
import {UpdateServiceDto} from "./dto/update-service.dto";

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {
    }

    @Get()
    getAllServices(): Promise<ServiceModel[]> {
        return this.serviceService.getAll();
    }

    @Get(':id')
    getServiceById(@Param('id') id: number): Promise<ServiceModel> {
        return this.serviceService.getById(id);
    }

    @Post()
    createService(@Body() dto: CreateServiceDto): Promise<ServiceModel> {
        return this.serviceService.create(dto);
    }

    @Put(':id')
    updateService(@Param('id') id: number,
                  @Body() dto: UpdateServiceDto): Promise<{message: string}> {
        return this.serviceService.update(id, dto);
    }

    @Delete(':id')
    deleteService(@Param('id') id: number): Promise<{message: string}> {
        return this.serviceService.delete(id);
    }
}
