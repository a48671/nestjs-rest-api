import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from './user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role-auth-decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleToUser } from './dtos/add-role-to-user';
import { BanUserDto } from './dtos/ban-user-dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersServer: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: UserModel })
  @Post('create')
  async createUser(@Body() userDto: CreateUserDto): Promise<UserModel> {
    return await this.usersServer.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<Array<UserModel>> {
    return await this.usersServer.getAllUsers();
  }

  @ApiOperation({ summary: 'Add role to users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('add-role')
  async addRoleToUser(@Body() dto: AddRoleToUser): Promise<UserModel> {
    return await this.usersServer.addRoleToUser(dto);
  }

  @ApiOperation({ summary: 'Add role to users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('ban')
  async banUser(@Body() dto: BanUserDto): Promise<UserModel> {
    return await this.usersServer.banUser(dto);
  }
}
