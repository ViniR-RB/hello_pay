import { UpdateUserDto } from '../../dto/updated_user.dto';
import { UserEntity } from '../user_entity';

export default interface UpdateUserUseCase {
  execute(id: string, updatedUserDto: UpdateUserDto): Promise<UserEntity>;
}
