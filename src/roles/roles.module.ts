import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from './role.model';
import { UserModel } from '../users/user.model';
import { UserRolesModel } from './user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([RoleModel, UserModel, UserRolesModel])
  ],
  exports: [RolesService]})
export class RolesModule {}
