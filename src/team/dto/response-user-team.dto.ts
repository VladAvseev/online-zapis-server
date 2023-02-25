import {TeamModel} from "../model/team.model";

export class ResponseUserTeamDto {
    readonly id: number;
    readonly title: string;
    readonly description: string | null;
    readonly image: string;

    constructor(team: TeamModel) {
        this.id = team.id;
        this.title = team.title;
        this.description = team.description || null;
        this.image = team.image;
    }
}