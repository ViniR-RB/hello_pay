import RepositoryException from 'src/core/exceptions/repository.exception';
import ServiceException from 'src/core/exceptions/service.exception';
import UserRepositoryInterface from '../adapters/user_repository';
import { CreateUserUseCase } from '../domain/usecase/create_user_use_case';
import { UserEntity } from '../domain/user_entity';

export default class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(user: UserEntity): Promise<void> {
    try {
      const userFinder = await this.userRepository.findOneByEmail(user.email);
      if (userFinder) throw new ServiceException('User already exists', 404);
      return await this.userRepository.create(user);
    } catch (error) {
      if (error instanceof ServiceException) throw error;
      else if (error instanceof RepositoryException)
        throw new ServiceException(error.message, 500);
    }
  }
}
