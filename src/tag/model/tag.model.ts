import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {TeamModel} from "../../team/model/team.model";
import {TeamTagModel} from "./team-tag.model";


interface TagCreationAttrs {
    value: string;
}

@Table({tableName: 'tag', createdAt: false, updatedAt: false})
export class TagModel extends Model<TagModel, TagCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    // TAG ONE-TO-MANY TEAM-TAG
    @BelongsToMany(() => TeamModel, () => TeamTagModel)
    teams: TeamModel[];
}