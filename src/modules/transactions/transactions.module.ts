import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SignatureRepositoryInterface from '../signature/adapters/signature_repository';
import SignatureModule from '../signature/signature.module';
import { SIGNATURE_REPOSITORY } from '../signature/symbols';
import UserRepositoryInterface from '../user/adapters/user_repository';
import { USER_REPOSITORY } from '../user/symbols';
import UserModule from '../user/user.module';
import { TransactionsRepository } from './adapters/transactions_repository';
import CreateTransactionsService from './application/create_transactions.service';
import TransactionsController from './controller/transactions_controller';
import TransactionModel from './infra/models/transaction.model';
import TransactionsRepositoryImpl from './infra/repository/transactions_repository_impl';
import {
  CREATE_TRANSACTIONS_USE_CASE,
  TRANSACTION_REPOSITORY,
} from './symbols';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionModel]),
    UserModule,
    SignatureModule,
  ],
  controllers: [TransactionsController],
  providers: [
    {
      inject: [
        getRepositoryToken(TransactionModel),
        SIGNATURE_REPOSITORY,
        USER_REPOSITORY,
      ],
      provide: TRANSACTION_REPOSITORY,
      useFactory: (
        transactionRepository: Repository<TransactionModel>,
        signatureRepository: SignatureRepositoryInterface,
        userRepository: UserRepositoryInterface,
      ) =>
        new TransactionsRepositoryImpl(
          transactionRepository,
          signatureRepository,
          userRepository,
        ),
    },
    {
      inject: [TRANSACTION_REPOSITORY],
      provide: CREATE_TRANSACTIONS_USE_CASE,
      useFactory: (transactionRepository: TransactionsRepository) =>
        new CreateTransactionsService(transactionRepository),
    },
  ],
})
export default class TransactionsModule {}
