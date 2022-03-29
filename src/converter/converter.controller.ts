import {Body,  Get, Post , Request, Controller } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { CreateConversionDto } from './Dto/CreateConversion.dto';
@Controller('converter')
export class ConverterController {constructor(private readonly converterService: ConverterService) {}
@Post('convert')
createConversion( @Body() createConversionDto: CreateConversionDto) {
    
  return this.converterService.createConversion( createConversionDto);
}
@Get('getConversions')
getConversions():Promise<any> {
    
    return this.converterService.getConversions();
  }
}
