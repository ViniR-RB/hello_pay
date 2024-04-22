import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import {
  CreateTransactionParams,
  CreateTransactionUseCase,
} from '../domain/usecase/create_transactions';
import { CreateTransactionsDto } from '../dto/create_transactions.dto';
import { CREATE_TRANSACTIONS_USE_CASE } from '../symbols';

@Controller('api/transactions')
export default class TransactionsController {
  constructor(
    @Inject(CREATE_TRANSACTIONS_USE_CASE)
    private readonly createTransactionsService: CreateTransactionUseCase,
  ) {}

  @Post('')
  @HttpCode(201)
  async createTransactions(
    @Body() dataList: CreateTransactionsDto,
  ): Promise<void> {
    const createTransactionsParams = dataList.listTransaction.map(
      (transaction) => {
        return new CreateTransactionParams(
          transaction.signature,
          transaction.total,
          transaction.paymentType,
          transaction.customer,
          transaction.paymentDate,
          transaction.processorResponse,
        );
      },
    );

    await this.createTransactionsService.createTransactions(
      createTransactionsParams,
    );
  }
}
