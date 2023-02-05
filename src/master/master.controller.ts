import {Body, Controller, Post} from '@nestjs/common';
import {MasterService} from "./master.service";

@Controller('master')
export class MasterController {
    constructor(private masterService: MasterService) {}

    @Post()
    inviteMaster(@Body() email: string): Promise<{message: string}> {
        return this.masterService.invite(email)
    }
}
