import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {MasterService} from "./master.service";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";

@Controller('master')
export class MasterController {
    constructor(private masterService: MasterService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    inviteMaster(@Body() email: string): Promise<{message: string}> {
        return this.masterService.invite(email)
    }
}
