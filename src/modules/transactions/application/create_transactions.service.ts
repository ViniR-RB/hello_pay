import { TransactionsRepository } from '../adapters/transactions_repository';
import { TransactionEntity } from '../domain/entity/transaction.entity';
import {
  CreateTransactionParams,
  CreateTransactionUseCase,
} from '../domain/usecase/create_transactions';

export default class CreateTransactionsService
  implements CreateTransactionUseCase
{
  constructor(private readonly transactionRepository: TransactionsRepository) {}
  async createTransactions(dataList: CreateTransactionParams[]): Promise<void> {
    const listTransactions: TransactionEntity[] = dataList.map((data) =>
      data.toEntity(),
    );
    await this.transactionRepository.createTransactions(listTransactions);
  }
}
