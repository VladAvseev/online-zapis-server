import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {TeamService} from "./team.service";
import {TeamModel} from "./model/team.model";
import {CreateTeamDto} from "./dto/create-team.dto";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {UpdateTeamDto} from "./dto/update-team.dto";

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) {}

    @Get()
    getAllTeams(): Promise<TeamModel[]> {
        return this.teamService.getAll();
    }

    @Get('/:id')
    getTeamById(@Param('id') id: number): Promise<TeamModel> {
        return this.teamService.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createTeam(@Body() dto: CreateTeamDto): Promise<TeamModel> {
        return this.teamService.create(dto);
    }

    @Put('/:id')
    updateTeam(@Param('id') id: number, @Body() dto: UpdateTeamDto): Promise<TeamModel> {
        return this.teamService.update(id, dto);
    }
}
