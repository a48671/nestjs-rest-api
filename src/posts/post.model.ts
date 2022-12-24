import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../users/user.model';

interface IPostCreateAttributes {
  title: string;
  text: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, IPostCreateAttributes> {
  @ApiProperty({ example: 1, description: 'Unique id of post' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Title', description: 'Title of post' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Come text', description: 'Text of role' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: '/static/img.png', description: 'Link of image' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ApiProperty({ example: 1, description: 'Unique id of user' })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  users: UserModel;
}
