import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/model/user.model";
import {MasterServiceModel} from "../../service/model/master-service.model";

interface TicketCreationAttrs {
    time: Date;
    comment: string;
}

@Table({tableName: 'ticket'})
export class TicketModel extends Model<TicketModel, TicketCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.DATE, allowNull: false})
    time: Date;

    @Column({type: DataType.STRING})
    comment: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_cancel: boolean;

    // TICKET ONE-TO-MANY MASTER-SERVICE
    @ForeignKey(() => MasterServiceModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE'})
    service_id: number;
    @BelongsTo(() => MasterServiceModel)
    service: MasterServiceModel;

    // TICKET MANY-TO-ONE USER
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE'})
    user_id: number;
    @BelongsTo(() => UserModel)
    user: UserModel;
}