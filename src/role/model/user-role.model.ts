import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/model/user.model";
import {RoleModel} from "./role.model";

@Table({tableName: 'user_role', createdAt: false, updatedAt: false})
export class UserRoleModel extends Model<UserRoleModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // USER-ROLE MANY-TO-ONE ROLE
    @ForeignKey(() => RoleModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'cascade'})
    role_id: number;

    // USER-ROLE MANY-TO-ONE USER
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'cascade'})
    user_id: number;
}