import {Body, Controller, Delete, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {MasterService} from "./master.service";
import {JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import {ResponseMasterDto} from "./dto/response-master.dto";
import {CreateMasterDto} from "./dto/create-master.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('master')
export class MasterController {
    constructor(private masterService: MasterService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    inviteMaster(@Body() email: string): Promise<{message: string}> {
        return this.masterService.invite(email)
    }

    // @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(FileInterceptor('image'))
    // updateMaster(@Param('id') id: number,
    //              @Body() dto: CreateMasterDto,
    //              @UploadedFile() image): Promise<ResponseMasterDto> {
    //     return this.masterService.update(id, dto, image);
    // }

    // @Delete('/:id/image')
    // @UseGuards(JwtAuthGuard)
    // deleteImage(@Param('id') id: number): Promise<{message: string}> {
    //     return this.masterService.deleteImage(id);
    // }
}
