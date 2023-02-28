import {ServiceModel} from "../model/service.model";

export class ResponseServiceDto {
    readonly id: number;
    readonly title: string;
    readonly description: string | null;
    readonly currency: string;
    readonly price: number;
    readonly duration: number;

    constructor(service: ServiceModel) {
        this.id = service.id;
        this.title = service.title;
        this.description = service.description || null
        this.currency = service.currency;
        this.price = service.price;
        this.duration = service.duration;
    }
}