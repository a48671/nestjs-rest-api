import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.register(dto);
  }
}
