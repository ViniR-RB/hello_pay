import { IsNumber, IsString } from 'class-validator';

export default class CreateSignatureDto {
  @IsNumber()
  value: number;
  @IsString()
  description: string;
}
