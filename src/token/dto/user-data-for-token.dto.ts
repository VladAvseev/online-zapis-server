import {ResponseRoleDto} from "../../role/dto/response-role.dto";
import {UserModel} from "../../user/model/user.model";

export class UserDataForTokenDto {
    readonly id: number;
    readonly roles: ResponseRoleDto[];
    readonly name: string;
    readonly email: string;
    readonly phone: string;


    constructor(user: UserModel) {
        this.id = user.id;
        this.roles = user.roles;
        this.name = user.name
        this.email = user.email;
        this.phone = user.phone;
    }
}