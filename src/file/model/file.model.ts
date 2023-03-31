import {Column, DataType, Model, Table} from "sequelize-typescript";

interface FileCreationAttrs {
    file: any;
    essence_table: string;
    essence_id: number;
}

@Table({tableName: 'file', createdAt: false, updatedAt: false})
export class FileModel extends Model<FileModel, FileCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.BLOB, allowNull: false})
    file: any;

    @Column({type: DataType.STRING})
    essence_table: string;

    @Column({type: DataType.INTEGER})
    essence_id: number;
}