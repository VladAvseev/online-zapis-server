import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TeamService} from "./team.service";
import {CreateTeamDto} from "./dto/create-team.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UpdateTeamDto} from "./dto/update-team.dto";
import {ResponseTeamDto} from "./dto/response-team.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateTagDto} from "../tag/dto/create-tag.dto";
import {TeamAdminGuard} from "./guard/team-admin.guard";
import {ResponseUserTeamDto} from "./dto/response-user-team.dto";
import {TagModel} from "../tag/model/tag.model";
import {ResponseTagDto} from "../tag/dto/response-tag.dto";

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) {}

    @Get()
    getAllTeams(@Query() dto: {city_id: number, search: string}): Promise<ResponseUserTeamDto[]> {
        return this.teamService.getAll(dto);
    }

    @Get('/:id')
    getTeamById(@Param('id') id: number): Promise<ResponseTeamDto> {
        return this.teamService.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createTeam(@Body() dto: CreateTeamDto): Promise<ResponseTeamDto> {
        return this.teamService.create(dto);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard, TeamAdminGuard)
    updateTeam(@Param('id') id: number,
               @Body() dto: UpdateTeamDto): Promise<ResponseTeamDto> {
        return this.teamService.update(id, dto);
    }

    // @Delete(':id')
    // @UseGuards(JwtAuthGuard, TeamAdminGuard)
    // delete(@Param('id') id: number): Promise<{message:string}> {
    //     return this.teamService.delete(id);
    // }

    @Post('/:id/tag')
    @UseGuards(JwtAuthGuard, TeamAdminGuard)
    addTag(@Param('id') id: number,
           @Body() dto: CreateTagDto): Promise<ResponseTagDto[]> {
        return this.teamService.addTag(id, dto.value);
    }

    @Delete('/:id/tag')
    @UseGuards(JwtAuthGuard, TeamAdminGuard)
    deleteTag(@Param('id') id: number,
              @Body() dto: CreateTagDto): Promise<ResponseTagDto[]> {
        return this.teamService.deleteTag(id, dto);
    }

    // @Put('/:id/image')
    // @UseGuards(JwtAuthGuard, TeamAdminGuard)
    // @UseInterceptors(FileInterceptor('image'))
    // updateImage(@Param('id') id: number,
    //             @UploadedFile() image): Promise<string> {
    //     return this.teamService.updateImage(id, image);
    // }
    //
    // @Delete('/:id/image')
    // @UseGuards(JwtAuthGuard, TeamAdminGuard)
    // deleteImage(@Param('id') id: number): Promise<{message: string}> {
    //     return this.teamService.deleteImage(id);
    // }
}
