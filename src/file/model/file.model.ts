import {Column, DataType, Model, Table} from "sequelize-typescript";

interface FileCreationAttrs {
    filename: string;
    file: any;
}

@Table({tableName: 'file', createdAt: false, updatedAt: false})
export class FileModel extends Model<FileModel, FileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    filename: string;

    @Column({type: DataType.BLOB, allowNull: false})
    file: any;
}