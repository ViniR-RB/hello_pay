import { Module } from '@nestjs/common';
import CoreModule from 'src/core/core.module';
import EncryptionService from 'src/core/services/encryption.service';
import JsonWebTokenService from 'src/core/services/json_web_token.service';
import UserRepositoryInterface from '../user/adapters/user_repository';
import { CreateUserUseCase } from '../user/domain/usecase/create_user_use_case';
import { CREATE_USER_USE_CASE, USER_REPOSITORY } from '../user/symbols';
import UserModule from '../user/user.module';
import LoginUserService from './application/login_user.service';
import RegisterUserService from './application/register_user.service';
import { AuthController } from './controller/auth.controller';
import { LOGIN_USER_USE_CASE, REGISTER_USER_SERVICE } from './symbols';

@Module({
  imports: [UserModule, CoreModule],
  controllers: [AuthController],
  providers: [
    {
      inject: [USER_REPOSITORY, JsonWebTokenService, EncryptionService],
      provide: LOGIN_USER_USE_CASE,
      useFactory: (
        userRepository: UserRepositoryInterface,
        jwtService: JsonWebTokenService,
        encryptionService: EncryptionService,
      ) => new LoginUserService(userRepository, jwtService, encryptionService),
    },
    {
      inject: [CREATE_USER_USE_CASE],
      provide: REGISTER_USER_SERVICE,
      useFactory: (createUserUseCase: CreateUserUseCase) =>
        new RegisterUserService(createUserUseCase),
    },
  ],
  exports: [],
})
export default class AuthModule {}
