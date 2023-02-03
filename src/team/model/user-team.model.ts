import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/model/user.model";
import {TeamModel} from "./team.model";

@Table({tableName: 'user_team', createdAt: false, updatedAt: false})
export class UserTeamModel extends Model<UserTeamModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // USER-ROLE MANY-TO-ONE ROLE
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE'})
    user_id: number;

    // USER-ROLE MANY-TO-ONE USER
    @ForeignKey(() => TeamModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE'})
    team_id: number;
}