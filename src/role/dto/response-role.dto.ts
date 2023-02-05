import {RoleModel} from "../model/role.model";

export class ResponseRoleDto {
    readonly value: string;

    constructor(role: RoleModel) {
        this.value = role.value;
    }
}