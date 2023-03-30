import {Controller, Get, Param} from '@nestjs/common';
import {FileService} from "./file.service";

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get(':filename')
    get(@Param('filename') filename: string): Promise<string> {
        return this.fileService.get(filename);
    }
}
