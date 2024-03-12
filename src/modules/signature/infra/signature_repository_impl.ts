import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SignatureRepositoryInterface from '../adapters/signature_repository';
import { SiganatureEntity } from '../domain/signature_entity';
import { SignatureModel } from './model/signature.model';

export default class SignatureRepositoryImpl
  implements SignatureRepositoryInterface
{
  constructor(
    @InjectRepository(SignatureModel)
    private readonly signatureRepoitory: Repository<SignatureModel>,
  ) {}
  async findOneById(id: string | null): Promise<SignatureModel | null> {
    try {
      const signature: SignatureModel | null =
        await this.signatureRepoitory.findOneOrFail({
          where: {
            id: id,
          },
        });
      return signature;
    } catch (error) {
      return null;
    }
  }
  async create(signature: SiganatureEntity): Promise<SiganatureEntity> {
    const data = {
      ...signature,
    };
    const signatureModel = await this.signatureRepoitory.save(
      this.signatureRepoitory.create(data),
    );
    return signatureModel.toEntity();
  }
}
