import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {RoleModel} from "../../role/model/role.model";
import {UserRoleModel} from "../../role/model/user-role.model";
import {CityModel} from "../../city/model/city.model";
import {TokenModel} from "../../token/model/token.model";
import {TeamModel} from "../../team/model/team.model";
import {MasterModel} from "../../master/model/master.model";
import {TicketModel} from "../../ticket/model/ticket.model";

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

    // USER ONE-TO-ONE TOKEN
    @HasOne(() => TokenModel)
    token: TokenModel;

    // USER ONE-TO-MANY USER-ROLE
    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles: RoleModel[];

    // USER MANY-TO-ONE CITY
    @ForeignKey(() => CityModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    city_id: number;
    @BelongsTo(() => CityModel)
    city: CityModel;

    // USER MANY-TO-ONE TEAM
    @ForeignKey(() => TeamModel)
    @Column({type: DataType.INTEGER, allowNull: true, onDelete: 'no action'})
    team_id: number;

    // USER ONE-TO-ONE MASTER
    @HasOne(() => MasterModel)
    master: MasterModel;

    // USER ONE-TO-MANY TICKET
    @HasMany(() => TicketModel)
    tickets: TicketModel[];
}