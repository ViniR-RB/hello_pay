import RepositoryException from 'src/core/exceptions/repository.exception';
import EncryptionService from 'src/core/services/encryption.service';
import SignatureRepositoryInterface from 'src/modules/signature/adapters/signature_repository';
import { SignatureModel } from 'src/modules/signature/infra/model/signature.model';
import { Repository } from 'typeorm';
import UserRepositoryInterface from '../adapters/user_repository';
import { UserEntity, UserRole } from '../domain/user_entity';
import { UpdateUserAdminDto } from '../dto/updated_user_admin.dto';
import UserModel from './models/user.model';

export default class UserRepositoryImpl implements UserRepositoryInterface {
  constructor(
    private readonly userRepository: Repository<UserModel>,
    private readonly signatureRepository: SignatureRepositoryInterface,
    private readonly encryptionService: EncryptionService,
  ) {}
  async findOneByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  async create(userEntity: UserEntity): Promise<void> {
    try {
      let signature: SignatureModel | null;
      userEntity.userRole === UserRole.User
        ? (signature = await this.signatureRepository.findOneById(
            userEntity.signatureCode,
          ))
        : (signature = null);
      const passwordHashed = await this.encryptionService.hash(
        userEntity.password,
      );
      userEntity.changePassword = passwordHashed;

      const user = this.userRepository.create({
        ...userEntity.toJSON(),
        signature,
      });

      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new RepositoryException('Erro ao salvar um usuário');
    }
  }
  async update(
    userModel: UserModel,
    dataAltered: UpdateUserAdminDto,
  ): Promise<UserModel> {
    const dataMerged = this.userRepository.merge(userModel, dataAltered);
    return await this.userRepository.save(dataMerged);
  }

  async findOneById(id: string): Promise<UserModel | null> {
    console.log(id);
    return await this.userRepository.findOneBy({
      id: id,
    });
  }
}
