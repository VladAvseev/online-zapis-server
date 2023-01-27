import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CityModel} from "./model/city.model";
import {CreateCityDto} from "./dto/create-city.dto";

@Injectable()
export class CityService {

    constructor(@InjectModel(CityModel) private cityRepository: typeof CityModel) {}

    async getAll(): Promise<CityModel[]> {
        const cities: CityModel[] = await this.cityRepository.findAll();
        return cities;
    }

    async getById(id: number): Promise<CityModel> {
        const city: CityModel = await this.cityRepository.findByPk(id);
        return city;
    }

    async create(cityDto: CreateCityDto): Promise<CityModel> {
        const city: CityModel = await this.cityRepository.create(cityDto);
        return city;
    }
}
