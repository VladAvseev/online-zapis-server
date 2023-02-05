import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CityModel} from "./model/city.model";
import {CreateCityDto} from "./dto/create-city.dto";
import {TeamModel} from "../team/model/team.model";

@Injectable()
export class CityService {

    constructor(@InjectModel(CityModel) private cityRepository: typeof CityModel) {}

    async getAll(): Promise<CityModel[]> {
        const cities: CityModel[] = await this.cityRepository.findAll();
        return cities;
    }

    async getById(id: number): Promise<CityModel> {
        const city: CityModel = await this.cityRepository.findByPk(id, {include: [{model: TeamModel}]});

        if (!city) {
            throw new HttpException({message: "Город не найден"}, HttpStatus.BAD_REQUEST);
        }

        return city;
    }

    async create(dto: CreateCityDto): Promise<CityModel> {
        const city: CityModel = await this.cityRepository.create(dto);
        return city;
    }
}
