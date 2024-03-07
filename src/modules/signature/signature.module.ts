import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SignatureRepositoryInterface from './adapters/signature_repository';
import CreateSignatureService from './application/create_signature.service';
import SignatureController from './controller/signature.controller';
import { SignatureModel } from './infra/model/signature.model';
import SignatureRepositoryImpl from './infra/signature_repository_impl';
import { CREATE_SIGNATURE_USE_CASE, SIGNATURE_REPOSITORY } from './symbols';

@Module({
  imports: [TypeOrmModule.forFeature([SignatureModel])],
  controllers: [SignatureController],
  providers: [
    {
      inject: [getRepositoryToken(SignatureModel)],
      provide: SIGNATURE_REPOSITORY,
      useFactory: (signatureRepository: Repository<SignatureModel>) =>
        new SignatureRepositoryImpl(signatureRepository),
    },

    {
      inject: [SIGNATURE_REPOSITORY],
      provide: CREATE_SIGNATURE_USE_CASE,
      useFactory: (signatureRepository: SignatureRepositoryInterface) =>
        new CreateSignatureService(signatureRepository),
    },
  ],
})
export default class SignatureModule {}
