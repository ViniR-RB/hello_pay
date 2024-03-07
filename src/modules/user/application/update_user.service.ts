import ServiceException from 'src/core/exceptions/service.exception';
import UserRepositoryInterface from '../adapters/user_repository';
import UpdateUserUseCase from '../domain/usecase/update_user_use_case';
import { UserEntity } from '../domain/user_entity';
import { UpdateUserDto } from '../dto/updated_user.dto';

export default class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  async execute(
    id: string,
    updatedUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userFinder = await this.userRepository.findOneById(id);
    if (!userFinder) throw new ServiceException('Usuário não encontrado', 404);

    const userUpdated = await this.userRepository.update(
      userFinder,
      updatedUserDto,
    );
    return userUpdated.toEntity();
  }
}
