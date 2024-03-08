import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import ConfigurationService from './services/configuration.service';
import EncryptionService from './services/encryption.service';
import JsonWebTokenService from './services/json_web_token.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [CoreModule],
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => ({
        secret: configurationService.jwtSecretKey(),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [ConfigurationService, EncryptionService, JsonWebTokenService],
  exports: [ConfigurationService, EncryptionService, JsonWebTokenService],
})
export default class CoreModule {}
