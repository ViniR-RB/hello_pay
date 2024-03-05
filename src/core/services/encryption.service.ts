import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import ConfigurationService from './configuration.service';
@Injectable()
export default class EncryptionService {
  private saltRounds: number;
  constructor(private readonly configurationService: ConfigurationService) {
    this.saltRounds = configurationService.saltRounds();
  }

  async hash(stringAny: string): Promise<string> {
    return await hash(stringAny, this.saltRounds);
  }
  async compare(stringAny: string, hash: string): Promise<boolean> {
    return await compare(stringAny, hash);
  }
}
