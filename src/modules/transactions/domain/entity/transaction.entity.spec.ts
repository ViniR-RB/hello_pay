import { SiganatureEntity } from '../../../signature/domain/signature_entity';
import { UserEntity } from '../../../user/domain/user_entity';
import {
  TransactionEntity,
  TransactionPaymentType,
  TransactionProps,
  TransactionStatus,
} from './transaction.entity';

describe('Unit Test in Transaction Entity constructor', () => {
  test('should return a new transaction entity withou id', () => {
    const signature = new SiganatureEntity(74.0, '500 mega plan');
    const customer = new UserEntity({
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
      phone: '123456789',
      signatureCode: signature.signatureId,
    });
    const transactionProps: TransactionProps = {
      signature: signature.signatureId,
      total: signature.signatureValue,
      customer: customer.id,
      paymentType: TransactionPaymentType.CreditCard,
      paymentDate: '2021-01-01',
    };
    const transaction = new TransactionEntity(transactionProps);

    expect(transaction).toBeInstanceOf(TransactionEntity);
    expect(transaction.transactionId).toBeDefined();
    expect(transaction.transactionStatus).toEqual(TransactionStatus.Created);
    expect(transaction.transactionSignatureCode).toEqual(signature.signatureId);
  });
});
