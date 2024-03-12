import { UserEntity } from '../domain/user_entity';
import { UpdateUserAdminDto } from '../dto/updated_user_admin.dto';
import UserModel from '../infra/models/user.model';

export default interface UserRepositoryInterface {
  create: (userEntity: UserEntity) => Promise<void>;
  update: (
    userModel: UserModel,
    dataAltered: UpdateUserAdminDto,
  ) => Promise<UserModel>;
  findOneById(id: string): Promise<UserModel | null>;
  findOneByEmail(email: string): Promise<UserModel | null>;
}
