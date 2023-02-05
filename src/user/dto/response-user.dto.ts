import {UserModel} from "../model/user.model";
import {CityModel} from "../../city/model/city.model";
import {ResponseTeamDto} from "../../team/dto/response-team.dto";
import {ResponseRoleDto} from "../../role/dto/response-role.dto";
import {ResponseUserMasterDto} from "../../master/dto/response-user-master.dto";

export class ResponseUserDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly team_id?: number;
    readonly city: CityModel;
    readonly roles: ResponseRoleDto[];
    readonly master: ResponseUserMasterDto;
    readonly teams: ResponseTeamDto[];

    constructor(user: UserModel) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.team_id = user.team_id || null;
        this.city = user.city;
        this.roles = user.roles.map(role => new ResponseRoleDto(role));
        this.master = new ResponseUserMasterDto(user.master);
        this.teams = user.teams.map(team => new ResponseTeamDto(team));
    }
}