import { UserEntity } from '../domain/user_entity';
import { UpdateUserDto } from '../dto/updated_user.dto';
import UserModel from '../infra/models/user.model';

export default interface UserRepositoryInterface {
  create: (userEntity: UserEntity) => Promise<void>;
  update: (
    userModel: UserModel,
    dataAltered: UpdateUserDto,
  ) => Promise<UserModel>;
  findOneById(id: string): Promise<UserModel | null>;
  findOneByEmail(email: string): Promise<UserModel | null>;
}
