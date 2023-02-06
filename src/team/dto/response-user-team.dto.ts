import {TeamModel} from "../model/team.model";

export class ResponseUserTeamDto {
    readonly id: number;
    readonly title: string;
    readonly description: string | null;

    constructor(team: TeamModel) {
        this.id = team.id;
        this.title = team.title;
        this.description = team.description || null
    }
}