import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConverterDocument = Converter & Document;

@Schema()
export class Converter {
  @Prop()
  fromCurrency: String;

  @Prop()
  toCurrency:String;

  @Prop()
  conversionDate:String;
}

export const ConverterSchema = SchemaFactory.createForClass(Converter);