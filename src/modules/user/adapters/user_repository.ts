import CreateUserDto from '../dto/create_user.dto';
import UserModel from '../infra/models/user_model';

export default interface UserRepositoryInterface {
  create: (userDto: CreateUserDto) => Promise<UserModel>;
}
