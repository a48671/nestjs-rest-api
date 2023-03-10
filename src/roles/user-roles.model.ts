import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { UserModel } from '../users/user.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRolesModel extends Model<UserRolesModel> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER })
  roleId: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: string;
}
