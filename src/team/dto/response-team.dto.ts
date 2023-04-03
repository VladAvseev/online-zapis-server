import {CityModel} from "../../city/model/city.model";
import {TeamModel} from "../model/team.model";
import {ResponseTagDto} from "../../tag/dto/response-tag.dto";
import {ResponseMasterDto} from "../../master/dto/response-master.dto";

export class ResponseTeamDto {
    readonly id: number;
    readonly title: string;
    readonly email: string;
    readonly phone: string | null;
    readonly description: string | null;
    readonly city: CityModel;
    readonly admin_id: number;
    readonly address: string;
    readonly tags: ResponseTagDto[];

    readonly masters: ResponseMasterDto[];

    constructor(team: TeamModel) {
        this.id = team.id;
        this.title = team.title;
        this.email = team.email;
        this.phone = team.phone || null;
        this.description = team.description || null
        this.city = team.city;
        this.admin_id = team.admin_id;
        this.address = team.address;
        this.tags = team.tags ? team.tags.map(tag => new ResponseTagDto(tag)) : [];
        this.masters = team.masters ? team.masters.map(master => new ResponseMasterDto(master)) : [];
    }
}