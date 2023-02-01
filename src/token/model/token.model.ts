import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/model/user.model";
import {SaveTokenDto} from "../dto/save-token.dto";

@Table({tableName: 'token', createdAt: false, updatedAt: false})
export class TokenModel extends Model<TokenModel, SaveTokenDto>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    refresh_token: string;

    // TOKEN ONE-TO-ONE USER
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'cascade'})
    user_id: string;
}