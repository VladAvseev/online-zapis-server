import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {RoleModel} from "../../role/model/role.model";
import {UserRoleModel} from "../../role/model/user-role.model";
import {CityModel} from "../../city/model/city.model";
import {TokenModel} from "../../token/model/token.model";

interface UserCreationAttrs {
    name: string;
    email: string;
    phone: string;
    password: string;
    city_id: number;
}

@Table({tableName: 'user'})
export class UserModel extends Model<UserModel, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    phone: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ForeignKey(() => CityModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    city_id: number;

    @BelongsTo(() => CityModel)
    city: CityModel;

    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles: RoleModel[];

    @HasOne(() => TokenModel)
    token: TokenModel;
}