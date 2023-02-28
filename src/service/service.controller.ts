import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ServiceService} from "./service.service";
import {CreateServiceDto} from "./dto/create-service.dto";
import {UpdateServiceDto} from "./dto/update-service.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {ResponseServiceDto} from "./dto/response-service.dto";

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {
    }

    @Get('/team/:id')
    getAllServices(@Param('id') id: number): Promise<ResponseServiceDto[]> {
        return this.serviceService.getAll(id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getServiceById(@Param('id') id: number): Promise<ResponseServiceDto> {
        return this.serviceService.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createService(@Body() dto: CreateServiceDto): Promise<ResponseServiceDto> {
        return this.serviceService.create(dto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateService(@Param('id') id: number,
                  @Body() dto: UpdateServiceDto): Promise<{message: string}> {
        return this.serviceService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteService(@Param('id') id: number): Promise<{message: string}> {
        return this.serviceService.delete(id);
    }
}
