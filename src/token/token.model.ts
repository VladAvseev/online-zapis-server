import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../user/user.model";
import {SaveTokenDto} from "./dto/save-token.dto";

@Table({tableName: 'token'})
export class TokenModel extends Model<TokenModel, SaveTokenDto>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    refresh_token: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    user_id: string;

    @BelongsTo(() => UserModel)
    user: UserModel;
}