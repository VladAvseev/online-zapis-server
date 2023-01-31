import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {TagService} from "./tag.service";
import {TagModel} from "./model/tag.model";
import {CreateTagDto} from "./dto/create-tag.dto";

@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllRoles(): Promise<TagModel[]> {
        return this.tagService.getAll();
    }

    @Get(':value')
    @UseGuards(JwtAuthGuard)
    getRoleById(@Param('value') value: string): Promise<TagModel> {
        return this.tagService.getByValue(value);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createRole(@Body() tagDto: CreateTagDto): Promise<TagModel> {
        return this.tagService.create(tagDto);
    }
}
