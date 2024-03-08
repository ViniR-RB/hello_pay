import { Inject } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/domain/usecase/create_user_use_case';
import { UserEntity } from 'src/modules/user/domain/user_entity';
import { CreateUserDto } from 'src/modules/user/dto/create_user.dto';
import { CREATE_USER_USE_CASE } from 'src/modules/user/symbols';

export default class RegisterUserService {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<void> {
    const userEntity = new UserEntity({ ...userDto });
    await this.createUserUseCase.execute(userEntity);
  }
}
