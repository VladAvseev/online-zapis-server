import {MasterModel} from "../model/master.model";

export class ResponseMasterDto {
    readonly description: string | null;
    readonly position: string | null
    readonly schedule: Date[][] | null;
    readonly image: string | null;

    constructor(master: MasterModel) {
        this.description = master?.description;
        this.position = master?.position;
        this.schedule = master?.schedule;
        this.image = master?.image;
    }
}