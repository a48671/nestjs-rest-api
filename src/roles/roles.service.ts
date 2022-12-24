import { Get, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './role.model';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(RoleModel) private rolesRepository: typeof RoleModel) {}

  createRole(roleDto: CreateRoleDto): Promise<RoleModel> {
    return this.rolesRepository.create(roleDto);
  }

  getRoleByValue(value: string): Promise<RoleModel | null> {
    return this.rolesRepository.findOne({ where: { value } });
  }
}
