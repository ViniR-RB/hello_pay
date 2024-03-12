import { IsString } from 'class-validator';
import { CreateUserAdminDto } from './create_user_admin.dto';

export default class CreateUserDto extends CreateUserAdminDto {
  @IsString()
  signatureCode: string;
  @IsString({})
  zipCode: string;
  @IsString({})
  phone: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsString()
  address: string;
  @IsString()
  document: string;
}
