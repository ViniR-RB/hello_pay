import {
  TransactionEntity,
  TransactionPaymentType,
  TransactionProps,
} from '../entity/transaction.entity';

export interface CreateTransactionUseCase {
  createTransactions(dataList: CreateTransactionParams[]): Promise<void>;
}

export class CreateTransactionParams {
  signature: string;
  total: number;
  paymentType: TransactionPaymentType;
  customer: string;
  paymentDate: string;
  processorResponse?: Partial<Record<string, any>>;
  constructor(
    signature: string,
    total: number,
    paymentType: TransactionPaymentType,
    customer: string,
    paymentDate: string,
    processorResponse?: Partial<Record<string, any>>,
  ) {
    this.signature = signature;
    this.total = total;
    this.paymentType = paymentType;
    this.customer = customer;
    this.processorResponse = processorResponse;
    this.paymentDate = paymentDate;
  }

  toEntity(): TransactionEntity {
    const transactionProps: TransactionProps = {
      signature: this.signature,
      total: this.total,
      paymentType: this.paymentType,
      customer: this.customer,
      paymentDate: this.paymentDate,
      processorResponse: this.processorResponse,
    };
    return new TransactionEntity({ ...transactionProps });
  }
}
