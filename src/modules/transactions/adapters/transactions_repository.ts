import { TransactionEntity } from '../domain/entity/transaction.entity';
import TransactionModel from '../infra/models/transaction.model';

export interface TransactionsRepository {
  createTransactions(
    transactionList: TransactionEntity[],
  ): Promise<TransactionModel[]>;
}
