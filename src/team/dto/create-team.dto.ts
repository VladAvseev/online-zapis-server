import {CreateTagDto} from "../../tag/dto/create-tag.dto";

export class CreateTeamDto {
    readonly admin_id: number;
    readonly title: string;
    readonly phone: string;
    readonly email: string;
    readonly address: string;
    readonly city_id: number;
    readonly tags: string[];
}