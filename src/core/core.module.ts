import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ConfigurationService from './services/configuration.service';
import EncryptionService from './services/encryption.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [ConfigurationService, EncryptionService],
  exports: [ConfigurationService, EncryptionService],
})
export default class CoreModule {}
