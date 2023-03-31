import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TagModel} from "./model/tag.model";
import {CreateTagDto} from "./dto/create-tag.dto";

@Injectable()
export class TagService {
    constructor(@InjectModel(TagModel) private tagRepository: typeof TagModel) {}

    async getAll(): Promise<TagModel[]> {
        const tags: TagModel[] = await this.tagRepository.findAll();
        return tags;
    }

    async getByValue(value: string): Promise<TagModel> {
        const tag: TagModel = await this.tagRepository.findOne({
            where: {
                value,
            },
        });
        return tag;
    }

    async create(dto: CreateTagDto): Promise<TagModel> {
        const tag: TagModel = await this.tagRepository.create(dto);
        return tag;
    }

    async addTags(dto: string[]): Promise<TagModel[]> {
        const tags: TagModel[] = [];
        for await (const dtoTag of dto) {
            let tag: TagModel = await this.getByValue(dtoTag);
            if (tag) {
                tags.push(tag);
            } else {
                tag = await this.create({value: dtoTag});
                tags.push(tag);
            }
        }
        return tags;
    }
}
