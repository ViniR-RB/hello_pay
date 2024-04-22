import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateTransactionDto } from './create_transaction.dto';

export class CreateTransactionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(12)
  @ArrayMaxSize(12)
  @Type(() => CreateTransactionDto)
  listTransaction: CreateTransactionDto[];
}
