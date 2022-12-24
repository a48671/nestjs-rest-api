import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleModel } from './role.model';

@Controller('/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto): Promise<RoleModel | null> {
    return this.rolesService.createRole(dto);
  }

  @Get('/:value')
  getRoleByValue(@Param('value') value: string): Promise<RoleModel | null> {
    return this.rolesService.getRoleByValue(value);
  }
}
