import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../domain/user_entity';

export class CreateUserAdminDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsEnum(UserRole)
  role: UserRole;
}
