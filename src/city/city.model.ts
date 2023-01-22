import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import { UserModel } from '../user/user.model';

interface CityCreationAttrs {
  value: string;
}

@Table({ tableName: 'city', createdAt: false, updatedAt: false })
export class CityModel extends Model<CityModel, CityCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @HasMany(() => UserModel)
  users: UserModel[];
}
