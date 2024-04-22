import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoreModule from './core/core.module';
import ConfigurationService from './core/services/configuration.service';
import AuthModule from './modules/auth/auth.module';
import SignatureModule from './modules/signature/signature.module';
import TransactionsModule from './modules/transactions/transactions.module';
import UserModule from './modules/user/user.module';

@Module({
  imports: [
    CoreModule,
    UserModule,
    SignatureModule,
    AuthModule,
    TransactionsModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'postgres',
        host: configurationService.databaseHost(),
        port: configurationService.databasePort(),
        username: configurationService.databaseUsername(),
        password: configurationService.databasePassword(),
        database: configurationService.databaseName(),
        entities: [__dirname + '/**/**/**/**/*.model{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
