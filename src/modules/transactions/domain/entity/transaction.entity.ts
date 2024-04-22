import { randomUUID } from 'crypto';

export enum TransactionPaymentType {
  CreditCard = 'CreditCard',
}

export type TransactionProps = {
  signature: string;
  total: number;
  paymentType: TransactionPaymentType;
  customer: string;
  processorResponse?: Partial<Record<string, any>>;
  paymentDate: string;
};
export class TransactionEntity {
  constructor(
    private readonly props: TransactionProps,
    private readonly id?: Partial<string>,
  ) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
      processorResponse: this.props.processorResponse || {},
    };
  }

  get transactionId() {
    return this.id;
  }

  get transactionTotal() {
    return this.props.total;
  }

  get transactionPaymentType() {
    return this.props.paymentType;
  }

  get transactionPaymentDate() {
    return this.props.paymentDate;
  }

  get transactionCustomer() {
    return this.props.customer;
  }

  get transactionProcessorResponse() {
    return this.props.processorResponse;
  }

  get transactionSignatureCode() {
    return this.props.signature;
  }
}
