import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import CoreModule from 'src/core/core.module';
import EncryptionService from 'src/core/services/encryption.service';
import { Repository } from 'typeorm';
import UserRepositoryInterface from './adapters/user_repository';
import CreateUserService from './application/create_user.service';
import UpdateUserService from './application/update_user.service';
import UserController from './controller/user.controller';
import UserModel from './infra/models/user.model';
import UserRepositoryImpl from './infra/user_repository_impl';
import {
  CREATE_USER_USE_CASE,
  UPDATE_USER_USE_CASE,
  USER_REPOSITORY,
} from './symbols';
@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    {
      inject: [getRepositoryToken(UserModel), EncryptionService],
      provide: USER_REPOSITORY,
      useFactory: (
        userRepository: Repository<UserModel>,
        encryptionService: EncryptionService,
      ) => new UserRepositoryImpl(userRepository, encryptionService),
    },
    {
      inject: [USER_REPOSITORY],
      provide: CREATE_USER_USE_CASE,
      useFactory: (userRepository: UserRepositoryInterface) =>
        new CreateUserService(userRepository),
    },
    {
      inject: [USER_REPOSITORY],
      provide: UPDATE_USER_USE_CASE,
      useFactory: (userRepository: UserRepositoryInterface) =>
        new UpdateUserService(userRepository),
    },
  ],
})
export default class UserModule {}
