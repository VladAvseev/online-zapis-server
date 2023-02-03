import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from "sequelize-typescript";
import {CityModel} from "../../city/model/city.model";
import {TagModel} from "../../tag/model/tag.model";
import {TeamTagModel} from "../../tag/model/team-tag.model";
import {UserModel} from "../../user/model/user.model";
import {ServiceModel} from "../../service/model/service.model";
import {UserTeamModel} from "./user-team.model";

interface TeamCreationAttrs {
    admin_id: number;
    title: string;
    email: string;
    phone: string;
    address: string;
    city_id: number;
}

@Table({tableName: 'team'})
export class TeamModel extends Model<TeamModel, TeamCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    admin_id: number;

    @Column({type: DataType.TEXT})
    description: string;

    // TEAM MANY-TO-ONE CITY
    @ForeignKey(() => CityModel)
    @Column({type: DataType.INTEGER, allowNull: true, onDelete: 'SET NULL'})
    city_id: number;
    @BelongsTo(() => CityModel)
    city: CityModel;

    // TEAM ONE-TO-MANY TEAM-TAG
    @BelongsToMany(() => TagModel, () => TeamTagModel)
    tags: TagModel[];

    // TEAM ONE-TO-MANY USER
    @HasMany(() => UserModel)
    users: UserModel[];

    // TEAM ONE-TO-MANY SERVICE
    @HasMany(() => ServiceModel)
    services: ServiceModel[];

    // TEAM ONE-TO-MANY USER-TEAM
    @BelongsToMany(() => UserModel, () => UserTeamModel)
    saves: UserModel[];
}