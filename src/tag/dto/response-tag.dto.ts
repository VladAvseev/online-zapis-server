import {TagModel} from "../model/tag.model";

export class ResponseTagDto {
    readonly value: string;

    constructor(tag: TagModel) {
        this.value = tag.value;
    }
}