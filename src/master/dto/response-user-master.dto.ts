import {MasterModel} from "../model/master.model";

export class ResponseUserMasterDto {
    readonly description: string | null;
    readonly position: string | null
    readonly schedule: Date[][] | null;

    constructor(master: MasterModel) {
        this.description = master?.description;
        this.position = master?.position;
        this.schedule = master?.schedule;
    }
}