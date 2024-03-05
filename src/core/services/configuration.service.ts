import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export default class ConfigurationService {
  constructor(private configService: ConfigService) {
    this.configService = configService;
  }

  databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }
  databasePort(): number {
    return Number(this.configService.get<number>('DATABASE_PORT'));
  }
  databaseName(): string {
    return String(this.configService.get<string>('DATABASE_NAME'));
  }
  databasePassword(): string {
    return String(this.configService.get<string>('DATABASE_PASSWORD'));
  }
  databaseUsername(): string {
    return String(this.configService.get<string>('DATABASE_USERNAME'));
  }

  databaseType(): string {
    return String(this.configService.get<string>('DATABASE_TYPE'));
  }

  jwtSecretKey(): string {
    return String(this.configService.get<string>('JWT_SECRET'));
  }
  saltRounds(): number {
    return Number(this.configService.get<string>('SALT_ROUNDS'));
  }
}
