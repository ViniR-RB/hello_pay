import SignatureRepositoryInterface from '../adapters/signature_repository';
import { SiganatureEntity } from '../domain/signature_entity';
import CreateSignatureUseCase from '../domain/usecase/create_signature_use_case';
import CreateSignatureDto from '../dto/create_signature.dto';

export default class CreateSignatureService implements CreateSignatureUseCase {
  constructor(
    private readonly signatureRepository: SignatureRepositoryInterface,
  ) {}
  execute(data: CreateSignatureDto): Promise<SiganatureEntity> {
    const signature = new SiganatureEntity(data.value, data.description);
    return this.signatureRepository.create(signature);
  }
}
