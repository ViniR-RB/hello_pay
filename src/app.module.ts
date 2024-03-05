import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoreModule from './core/core.module';
import ConfigurationService from './core/services/configuration.service';

@Module({
  imports: [
    CoreModule,

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
