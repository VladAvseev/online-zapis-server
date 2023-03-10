import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {

    async createFile(file, fileName): Promise<string> {
        try {
            if (!fileName) {
                fileName = uuid.v4() + '.jpg';
            }
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            throw new HttpException({message: 'Произошла ошибка при записи файла'}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteFile(filename): Promise<void> {
        try {
            const filepath = path.resolve(__dirname, '..', 'static', filename);
            fs.unlink(filepath, (err) => {
                console.log(err);
            });
        }catch (e) {
            throw new HttpException({message: 'Произошла ошибка при удалении файла'}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
