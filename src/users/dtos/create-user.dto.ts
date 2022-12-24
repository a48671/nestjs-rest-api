import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'qwe@qwe.ru', description: 'Email of user' })
  @IsString({ message: "Email has to be string" })
  @IsEmail({}, { message: 'Email is incorrect' })
  readonly email: string;

  @ApiProperty({ example: '***', description: 'Password' })
  @IsString({ message: "Password has to be string" })
  @Length(3, 16, { message: 'The length of password is incorrect' })
  readonly password: string;
}
