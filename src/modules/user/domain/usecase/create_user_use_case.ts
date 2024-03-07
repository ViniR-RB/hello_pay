import { UserEntity } from '../user_entity';

export interface CreateUserUseCase {
  execute(user: UserEntity): Promise<void>;
}
