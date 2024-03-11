import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAdminDto } from './create_user_admin.dto';
export class UpdateUserAdminDto extends PartialType(CreateUserAdminDto) {}
