import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/model/user.model";
import {UserRoleModel} from "./user-role.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'role', createdAt: false, updatedAt: false})
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    // ROLE ONE-TO-MANY USER-ROLE
    @BelongsToMany(() => UserModel, () => UserRoleModel)
    users: UserModel[];
}