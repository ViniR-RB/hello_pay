import EncryptionService from 'src/core/services/encryption.service';
import { Repository } from 'typeorm';
import UserRepositoryInterface from '../adapters/user_repository';
import { UserEntity } from '../domain/user_entity';
import { UpdateUserDto } from '../dto/updated_user.dto';
import UserModel from './models/user.model';

export default class UserRepositoryImpl implements UserRepositoryInterface {
  constructor(
    private readonly userRepository: Repository<UserModel>,
    private readonly encryptionService: EncryptionService,
  ) {}
  async findOneByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  async create(userEntity: UserEntity): Promise<void> {
    const passwordHashed = await this.encryptionService.hash(
      userEntity.password,
    );
    userEntity.changePassword = passwordHashed;

    const user = this.userRepository.create(userEntity.toJSON());

    await this.userRepository.save(user);
  }
  async update(
    userModel: UserModel,
    dataAltered: UpdateUserDto,
  ): Promise<UserModel> {
    const dataMerged = this.userRepository.merge(userModel, dataAltered);
    return await this.userRepository.save(dataMerged);
  }

  async findOneById(id: string): Promise<UserModel | null> {
    return await this.userRepository.findOneBy({
      id: id,
    });
  }
}
