import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { TransactionPaymentType } from '../domain/entity/transaction.entity';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  signature: string;
  @IsNumber()
  @IsNotEmpty()
  total: number;
  @IsEnum(TransactionPaymentType)
  @IsNotEmpty()
  paymentType: TransactionPaymentType;
  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;
  @IsString()
  @IsNotEmpty()
  customer: string;
  @IsObject()
  processorResponse?: Partial<Record<string, any>>;
}
