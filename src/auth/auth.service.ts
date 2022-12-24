import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserModel } from '../users/user.model';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(dto);

    const token = this.generateToken(user);

    return token;
  }

  async register(dto: CreateUserDto): Promise<{ token: string }> {
    const candidate = await this.usersService.getUserByEmail(dto.email);

    if (candidate) {
      throw new HttpException('User is already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.createUser(dto);

    const token = this.generateToken(user);

    return token;
  }

  generateToken(user: UserModel): { token: string } {
    const { email, id, roles } = user;

    const token = this.jwtService.sign({email, id, roles});

    return { token };
  }

  async validateUser(dto: CreateUserDto): Promise<UserModel> {
    const user = await this.usersService.getUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Error authorization');
    }

    const isValid = await compare(dto.password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException('Error authorization');
    }

    return  user;
  }
}
