import {Injectable} from '@nestjs/common';
import * as uuid from 'uuid';
import {InjectModel} from "@nestjs/sequelize";
import {FileModel} from "./model/file.model";
import {CreateFileDto} from "./dto/create-file.dto";

@Injectable()
export class FileService {
    constructor(@InjectModel(FileModel) private fileRepository: typeof FileModel) {}

    // async get(filename: string): Promise<string> {
    //     const file: FileModel = await this.fileRepository.findOne({where: {filename}});
    //     const src = 'data:image/jpeg;base64, '+file.file.toString('base64');
    //     return src;
    // }
    //
    // async create(file: any): Promise<string> {
    //     const filename: string = uuid.v4();
    //     await this.fileRepository.create({filename, file});
    //     return filename;
    // }
    //
    // async update(dto: CreateFileDto): Promise<void> {
    //     await this.fileRepository.update({file: dto.file}, {where: {filename: dto.filename}});
    // }
    //
    // async delete(filename: string): Promise<void> {
    //     await this.fileRepository.destroy({where: {filename}});
    // }
}
