import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { Converter, ConverterSchema } from './schemas/converter.schema';

import {HttpModule} from '@nestjs/axios';

@Module(
    {
        imports: [
        MongooseModule.forFeature([{ name: Converter.name, schema: ConverterSchema }]),
        HttpModule,],
        controllers: [ConverterController],
        providers: [ConverterService],
    })
export class ConverterModule { }
