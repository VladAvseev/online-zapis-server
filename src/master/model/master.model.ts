import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/model/user.model";
import {MasterServiceModel} from "../../service/model/master-service.model";
import {ServiceModel} from "../../service/model/service.model";
import {TeamModel} from "../../team/model/team.model";

interface MasterCreationAttrs {
    id: number;
}

@Table({tableName: 'master', createdAt: false, updatedAt: false})
export class MasterModel extends Model<MasterModel, MasterCreationAttrs> {
    // MASTER ONE-TO-ONE USER
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, onDelete: 'CASCADE'})
    id: number;
    @BelongsTo(() => UserModel)
    user: UserModel;

    @Column({type: DataType.STRING})
    position: string;

    @Column({type: DataType.STRING})
    description: string;

    @Column({type: DataType.ARRAY(DataType.ARRAY(DataType.TIME))})
    schedule: Date[][];

    // MASTER MANY-TO-ONE TEAM
    @ForeignKey(() => TeamModel)
    @Column({type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE'})
    team_id: number;

    // MASTER ONE-TO-MANY MASTER-SERVICE
    @BelongsToMany(() => ServiceModel, () => MasterServiceModel)
    services: ServiceModel[];
}