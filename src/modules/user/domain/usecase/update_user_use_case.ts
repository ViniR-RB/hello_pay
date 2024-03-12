import { UpdateUserAdminDto } from '../../dto/updated_user_admin.dto';
import { UserEntity } from '../user_entity';

export default interface UpdateUserUseCase {
  execute(id: string, updatedUserDto: UpdateUserAdminDto): Promise<UserEntity>;
}
