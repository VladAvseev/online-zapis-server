import {TeamModel} from "../model/team.model";
import {CityModel} from "../../city/model/city.model";

export class ResponseUserTeamDto {
    readonly id: number;
    readonly title: string;
    readonly description: string | null;
    readonly city: CityModel;

    readonly city_id: number;

    constructor(team: TeamModel) {
        this.id = team.id;
        this.title = team.title;
        this.description = team.description || null;
        this.city = team.city;
        this.city_id = team.city_id;
    }
}