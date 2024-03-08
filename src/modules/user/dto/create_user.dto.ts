import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../domain/user_entity';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsString()
  phone: string;
  @IsString()
  signatureCode: string;
  @IsEnum(UserRole)
  role: UserRole;
}
