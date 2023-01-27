import {RoleModel} from "../../role/model/role.model";
import {UserModel} from "../model/user.model";
import {CityModel} from "../../city/model/city.model";

interface ResponseUserRole {
    id: number;
    value: string;
}

export class ResponseUserDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: CityModel;
    roles: ResponseUserRole[];
    accessToken: string;
    refreshToken: string;

    constructor(id: number, name: string, email: string, phone: string, city: CityModel, roles: RoleModel[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.roles = roles.map(role => ({id: role.id, value: role.value}));
    }

    static toResponseUserDto(user: UserModel): ResponseUserDto {
        return new ResponseUserDto(user.id, user.name, user.email, user.phone, user.city, user.roles);
    }
}