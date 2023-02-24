import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {TeamService} from "./team.service";
import {TeamModel} from "./model/team.model";
import {CreateTeamDto} from "./dto/create-team.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UpdateTeamDto} from "./dto/update-team.dto";
import {ResponseTeamDto} from "./dto/response-team.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) {}

    @Post('/get')
    getAllTeams(@Body() dto: {cityId: number, search: string}): Promise<ResponseTeamDto[]> {
        return this.teamService.getAll(dto);
    }

    @Get('/:id')
    getTeamById(@Param('id') id: number): Promise<ResponseTeamDto> {
        return this.teamService.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createTeam(@Body() dto: CreateTeamDto): Promise<{ message: string }> {
        return this.teamService.create(dto);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    updateTeam(@Param('id') id: number,
               @Body() dto: {team: UpdateTeamDto, tags: string[]}): Promise<ResponseTeamDto> {
        return this.teamService.update(id, dto.team, dto.tags);
    }

    @Put('/:id/image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    updateImage(@Param('id') id: number,
                @UploadedFile() image): Promise<{message: string}> {
        return this.teamService.updateImage(id, image);
    }

    @Delete('/:id/image')
    @UseGuards(JwtAuthGuard)
    deleteImage(@Param('id') id: number): Promise<{message: string}> {
        return this.teamService.deleteImage(id);
    }
}
