import { InjectRepository } from '@nestjs/typeorm';
import SignatureRepositoryInterface from 'src/modules/signature/adapters/signature_repository';
import UserRepositoryInterface from 'src/modules/user/adapters/user_repository';
import { Repository } from 'typeorm';
import { TransactionsRepository } from '../../adapters/transactions_repository';
import { TransactionEntity } from '../../domain/entity/transaction.entity';
import TransactionModel from '../models/transaction.model';
export default class TransactionsRepositoryImpl
  implements TransactionsRepository
{
  constructor(
    @InjectRepository(TransactionModel)
    private readonly transactionRepository: Repository<TransactionModel>,
    private readonly signatureRepository: SignatureRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createTransactions(
    dataList: TransactionEntity[],
  ): Promise<TransactionModel[]> {
    const customer = await this.userRepository.findOneById(
      dataList[0].transactionCustomer,
    );
    const signature = await this.signatureRepository.findOneById(
      dataList[0].transactionSignatureCode,
    );

    const transactionModelList = dataList.map((transaction) => {
      const data = {
        id: transaction.transactionId,
        total: transaction.transactionTotal,
        paymentType: transaction.transactionPaymentType,
        paymentDate: transaction.transactionPaymentDate,
        customer: customer,
        signature: signature,
      };
      return this.transactionRepository.create(data);
    });

    await Promise.all([
      transactionModelList.map(async (transaction) => {
        console.log(transaction);
        await this.transactionRepository.save(
          this.transactionRepository.create(transaction),
        );
      }),
    ]);

    return transactionModelList;
  }
}
