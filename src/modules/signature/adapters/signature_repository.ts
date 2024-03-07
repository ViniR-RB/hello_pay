import { SiganatureEntity } from '../domain/signature_entity';

export default interface SignatureRepositoryInterface {
  create(signature: SiganatureEntity): Promise<SiganatureEntity>;
}
