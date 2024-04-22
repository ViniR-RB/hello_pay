import { SignatureModel } from 'src/modules/signature/infra/model/signature.model';
import UserModel from 'src/modules/user/infra/models/user.model';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import {
  TransactionEntity,
  TransactionPaymentType,
} from '../../domain/entity/transaction.entity';

@Entity({ name: 'transactions' })
export default class TransactionModel {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'enum', enum: TransactionPaymentType })
  paymentType: TransactionPaymentType;

  @Column({ type: 'date', name: 'payment_date' })
  paymentDate: string;

  @ManyToOne(() => UserModel, (user) => user.id)
  customer: UserModel;

  @ManyToOne(() => SignatureModel, (signature) => signature.id)
  signature: SignatureModel;

  constructor(transactionModel: Partial<TransactionModel>) {
    return Object.assign(this, transactionModel);
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      total: this.total,
      payment_type: this.paymentType,
      payment_date: this.paymentDate,
      customer: this.customer,
      signature: this.signature,
    };
  }

  toEntity(): TransactionEntity {
    const transactionProps = {
      signature: this.signature.id,
      total: this.total,
      paymentType: this.paymentType,
      customer: this.customer.id,
      paymentDate: this.paymentDate,
    };
    return new TransactionEntity({ ...transactionProps }, this.id);
  }
}
