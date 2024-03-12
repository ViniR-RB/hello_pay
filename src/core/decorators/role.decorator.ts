import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/user/domain/user_entity';

export const USER_ROLES_KEY = 'roles';
export const Roles = (roles: UserRole) => SetMetadata(USER_ROLES_KEY, roles);
