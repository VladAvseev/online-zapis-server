import {Controller, Get, Req, Res} from '@nestjs/common';
import {FileService} from "./file.service";
import { Readable } from 'stream';
import { Response, Request } from 'express';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get(':table/:id')
    async getImage(@Res() res: Response, @Req() req: Request) {
        const buffer: BufferSource = await this.fileService.get({essence_table: req.params.table, essence_id: +req.params.id});
        const imageStream = new Readable();
        imageStream.push(buffer);
        imageStream.push(null);

        res.setHeader('Content-Type', 'image/jpeg');
        imageStream.pipe(res);
    }
}
