import CreateSignatureDto from '../../dto/create_signature.dto';
import { SiganatureEntity } from '../signature_entity';

export default interface CreateSignatureUseCase {
  execute(data: CreateSignatureDto): Promise<SiganatureEntity>;
}
