import RepositoryException from 'src/core/exceptions/repository_exception';
import EncryptionService from 'src/core/services/encryption.service';
import { Repository } from 'typeorm';
import UserRepositoryInterface from '../adapters/user_repository';
import { UserEntity, UserProps } from '../domain/user_entity';
import CreateUserDto from '../dto/create_user.dto';
import UserModel from './models/user_model';

export default class UserRepositoryImpl implements UserRepositoryInterface {
  constructor(
    private readonly userRepository: Repository<UserModel>,
    private readonly encryptionService: EncryptionService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const userFinder = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userFinder) throw new RepositoryException('User already exists', 404);
    const userProps: UserProps = {
      ...createUserDto,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    const userEntity = new UserEntity(userProps);
    this.userRepository.save(this.userRepository.create(userEntity));
    return await this.userRepository.save(createUserDto);
  }
}
