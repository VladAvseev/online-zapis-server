import {UserModel} from "../model/user.model";
import {CityModel} from "../../city/model/city.model";
import {MasterModel} from "../../master/model/master.model";

interface ResponseUserRole {
    readonly value: string;
}

interface ResponseUserTeam {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly city: CityModel;
}

export class ResponseUserDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly city: CityModel;
    readonly roles: ResponseUserRole[];
    readonly master?: MasterModel;
    readonly teams: ResponseUserTeam[];

    constructor(user: UserModel) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.city = user.city;
        this.roles = user.roles.map(role => ({value: role.value}));
        this.master = user.master;
        this.teams = user.teams.map(team => ({id: team.id, title: team.title, description: team.description, city: team.city}));
    }
}