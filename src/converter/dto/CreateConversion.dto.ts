import {  IsNotEmpty,IsNumber } from 'class-validator';
export class CreateConversionDto {
  @IsNotEmpty()
    readonly fromCurrency: string
    @IsNotEmpty()
    readonly toCurrency: string
    @IsNotEmpty()
    @IsNumber()
    readonly amountToConvert: number
  }