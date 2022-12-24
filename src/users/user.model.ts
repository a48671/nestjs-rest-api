import { Table, Column, DataType, Model, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '../roles/role.model';
import { UserRolesModel } from '../roles/user-roles.model';
import { PostModel } from '../posts/post.model';

interface IUserCreationAttributes {
  email: string;
  passwordHash: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, IUserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'qwe@qwe.ru', description: 'Email of user' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '***', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash: string;

  @ApiProperty({ example: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'SPAM' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  roles: Array<RoleModel>;

  @HasMany(() => PostModel)
  posts: Array<PostModel>;
}
