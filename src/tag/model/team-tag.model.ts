import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {TagModel} from "./tag.model";
import {TeamModel} from "../../team/model/team.model";

@Table({tableName: 'team_tag', createdAt: false, updatedAt: false})
export class TeamTagModel extends Model<TeamTagModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => TagModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    tag_id: number;

    @ForeignKey(() => TeamModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    team_id: number;
}