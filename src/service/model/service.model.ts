import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {MasterModel} from "../../master/model/master.model";
import {MasterServiceModel} from "./master-service.model";
import {TeamModel} from "../../team/model/team.model";

interface ServiceCreationAttrs {
    title: string;
    description: string;
    currency: string;
    price: number;
    duration: number;
    team_id: number;
}

@Table({tableName: 'service', createdAt: false, updatedAt: false})
export class ServiceModel extends Model<ServiceModel, ServiceCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    description: string;

    @Column({type: DataType.STRING, allowNull: false})
    currency: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    duration: number;

    // SERVICE ONE-TO-MANY MASTER-SERVICE
    @BelongsToMany(() => MasterModel, () => MasterServiceModel)
    masters: MasterModel[];

    // SERVICE MANY-TO-ONE TEAM
    @ForeignKey(() => TeamModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE'})
    team_id: number;
}