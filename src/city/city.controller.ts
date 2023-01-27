import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CityModel} from "./model/city.model";
import {CityService} from "./city.service";
import {CreateCityDto} from "./dto/create-city.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesAuthGuard} from "../auth/guards/roles-auth.guard";

@Controller('city')
export class CityController {

    constructor(private cityService: CityService) {}

    @Get()
    getAllCities(): Promise<CityModel[]> {
       return this.cityService.getAll();
    }

    @Get(':id')
    getCityById(@Param('id') id: number): Promise<CityModel> {
        return this.cityService.getById(id);
    }

    @Post()
    @Roles("ADMIN")
    @UseGuards(RolesAuthGuard)
    createCity(@Body() cityDto: CreateCityDto): Promise<CityModel> {
        return this.cityService.create(cityDto);
    }
}
