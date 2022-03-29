import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import {ConverterModule} from'./converter/converter.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://neji:QK6vokKmNa9ENFb2@cluster0.5l1tw.mongodb.net/converter-app?retryWrites=true&w=majority'),
    ConverterModule,],
})
export class AppModule {}
