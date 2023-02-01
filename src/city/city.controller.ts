import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CityModel} from "./model/city.model";
import {CityService} from "./city.service";
import {CreateCityDto} from "./dto/create-city.dto";

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
    createCity(@Body() cityDto: CreateCityDto): Promise<CityModel> {
        return this.cityService.create(cityDto);
    }
}
