import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
}