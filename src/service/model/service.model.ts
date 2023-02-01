import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {MasterModel} from "../../master/model/master.model";
import {MasterServiceModel} from "./master-service.model";
import {TeamModel} from "../../team/model/team.model";

interface ServiceCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'service', createdAt: false, updatedAt: false})
export class ServiceModel extends Model<ServiceModel, ServiceCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // SERVICE ONE-TO-MANY MASTER-SERVICE
    @BelongsToMany(() => MasterModel, () => MasterServiceModel)
    masters: MasterModel[];

    // SERVICE MANY-TO-ONE TEAM
    @ForeignKey(() => TeamModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'cascade'})
    team_id: number;
}