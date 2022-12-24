import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { RolesModule } from './roles.module';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../users/user.model';
import { UserRolesModel } from './user-roles.model';

interface IRolesCreateAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RolesModule, IRolesCreateAttributes> {
  @ApiProperty({ example: 1, description: 'Unique id of role' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Title of role' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'This role can do everything', description: 'Description of role' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  users: UserModel;
}
