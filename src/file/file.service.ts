import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FileModel} from "./model/file.model";
import {CreateFileDto} from "./dto/create-file.dto";
import {EssenceFileDto} from "./dto/essence-file.dto";
import {isLogLevelEnabled} from "@nestjs/common/services/utils";

@Injectable()
export class FileService {
    constructor(@InjectModel(FileModel) private fileRepository: typeof FileModel) {}

    async get(dto: EssenceFileDto): Promise<BufferSource> {
        const file: FileModel = await this.fileRepository.findOne({
            where: {
                essence_table: dto.essence_table,
                essence_id: dto.essence_id
            }});
       return file ? Buffer.from(file.file, 'binary') : null;
    }

    async create(dto: CreateFileDto): Promise<void> {
        await this.fileRepository.create(dto);
    }

    async update(dto: CreateFileDto): Promise<void> {
        await this.fileRepository.update(
            {file: dto.file},
            {where: {
                    essence_table: dto.essence_table,
                    essence_id: dto.essence_id
            }});
    }

    async delete(dto: EssenceFileDto): Promise<void> {
        await this.fileRepository.destroy({
            where: {
                essence_table: dto.essence_table,
                essence_id: dto.essence_id
            }});
    }
}
