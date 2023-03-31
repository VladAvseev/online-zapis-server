import {UserModel} from "../model/user.model";
import {CityModel} from "../../city/model/city.model";
import {ResponseRoleDto} from "../../role/dto/response-role.dto";
import {ResponseMasterDto} from "../../master/dto/response-master.dto";
import {ResponseUserTeamDto} from "../../team/dto/response-user-team.dto";

export class ResponseUserDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;

    readonly city_id: number;
    readonly roles: ResponseRoleDto[];
    readonly master: ResponseMasterDto;
    readonly teams: ResponseUserTeamDto[];

    constructor(user: UserModel) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.city_id = user.city_id;
        this.roles = user.roles.map(role => new ResponseRoleDto(role));
        this.master = new ResponseMasterDto(user.master);
        this.teams = user.teams.map(team => new ResponseUserTeamDto(team));
    }
}