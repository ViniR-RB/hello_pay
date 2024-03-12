import { SiganatureEntity } from '../domain/signature_entity';
import { SignatureModel } from '../infra/model/signature.model';

export default interface SignatureRepositoryInterface {
  create(signature: SiganatureEntity): Promise<SiganatureEntity>;
  findOneById(id: string): Promise<SignatureModel | null>;
}
