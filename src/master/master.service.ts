import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {MasterModel} from "./model/master.model";
import {CreateMasterDto} from "./dto/create-master.dto";
import {ResponseMasterDto} from "./dto/response-master.dto";
import {FileService} from "../file/file.service";

@Injectable()
export class MasterService {
    constructor(@InjectModel(MasterModel) private masterRepository: typeof MasterModel,
                private fileService: FileService) {}

    async invite(email: string): Promise<{message: string}> {
        return {message: 'success'};
    }

    // PUT update image
    // async update(id: number, dto: CreateMasterDto, image: any): Promise<ResponseMasterDto> {
    //     const master: MasterModel = await this.masterRepository.findByPk(id);
    //     const fileName: string = await this.fileService.create(image, master.image);
    //     await this.masterRepository.update({...dto, image: fileName}, {where: {id}});
    //     const updatedMaster: MasterModel = await this.masterRepository.findByPk(id);
    //     return updatedMaster;
    // }

    // DELETE delete image
    async deleteImage(id: number): Promise<{message: string}> {
        const master: MasterModel = await this.getModelById(id);
        await this.fileService.delete(master.image);
        await master.update({image: null});
        return {message: 'success'};
    }

    async create(userId: number): Promise<MasterModel> {
        const master: MasterModel = await this.masterRepository.create({id: userId});
        return master;
    }

    async getModelById(id: number): Promise<MasterModel> {
        const master: MasterModel = await this.masterRepository.findByPk(id, {include: {all: true}});

        if (!master) {
            throw new HttpException({message: 'Мастер с таким id не найден'}, HttpStatus.BAD_REQUEST);
        }

        return master;
    }
}
