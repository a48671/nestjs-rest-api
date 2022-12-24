import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from 'bcryptjs';
import { RolesService } from '../roles/roles.service';
import { AddRoleToUser } from './dtos/add-role-to-user';
import { BanUserDto } from './dtos/ban-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private usersRepository: typeof UserModel,
    private readonly rolesService: RolesService
  ) {}

  async createUser({ password, email }: CreateUserDto): Promise<UserModel> {
    const passwordHash = await hash(password, Number(process.env.SALT));

    const result = await this.usersRepository.create({ email, passwordHash });

    const initRole = await this.rolesService.getRoleByValue('Admin');

    if (initRole) {
      await result.$set('roles', [initRole.id]);
    }

    const user = result.dataValues;

    user.roles = [initRole];

    return user;
  }

  async addRoleToUser({ value, userId }: AddRoleToUser): Promise<UserModel> {
    const user = await this.usersRepository.findByPk(userId);

    const role = await this.rolesService.getRoleByValue(value);

    if (role && user) {
      await user.$add('roles', role.id);
      return user
    }

    throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
  }

  async banUser({ banReason, userId }: BanUserDto): Promise<UserModel> {
    const user = await this.usersRepository.findByPk(userId);


    if (user) {
      user.banned = true;
      user.banReason = banReason;

      await user.save();

      return user;
    }

    throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
  }

  async getAllUsers(): Promise<Array<UserModel>> {
    const users = await this.usersRepository.findAll({ include: { all: true } });

    return users;
  }

  getUserByEmail(email: string): Promise<UserModel | null> {
    return this.usersRepository.findOne({ where: { email }, include: { all: true } })
  }
}

