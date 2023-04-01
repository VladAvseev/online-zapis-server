import {MasterModel} from "../model/master.model";

export class ResponseMasterDto {
    readonly id: number;
    readonly description: string | null;
    readonly position: string | null
    readonly schedule: Date[][] | null;

    readonly team_id: number;

    constructor(master: MasterModel) {
        this.id = master.id;
        this.description = master?.description;
        this.position = master?.position;
        this.schedule = master?.schedule;
        this.team_id = master.team_id;
    }
}