import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {MasterModel} from "../../master/model/master.model";
import {ServiceModel} from "./service.model";

@Table({tableName: 'master_service', createdAt: false, updatedAt: false})
export class MasterServiceModel extends Model<MasterServiceModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // MASTER-SERVICE MANY-TO-ONE MASTER
    @ForeignKey(() => MasterModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'cascade'})
    master_id: number;
    @BelongsTo(() => MasterModel)
    master: MasterModel;

    // MASTER-SERVICE MANY-TO-ONE SERVICE
    @ForeignKey(() => ServiceModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'cascade'})
    service_id: number;
    @BelongsTo(() => ServiceModel)
    service: ServiceModel;
}