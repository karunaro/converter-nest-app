import { HttpService } from '@nestjs/axios';
import {BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Converter, ConverterDocument } from './schemas/converter.schema';
@Injectable()
export class ConverterService {
    constructor(@InjectModel(Converter.name) private converterModel: Model<ConverterDocument>, private httpService: HttpService) { }


    async Convert(conversionInputs) {

        try {
            const { fromCurrency, toCurrency, amountToConvert } = conversionInputs;
            console.log(conversionInputs);
            let Value: number;

            const rates = await this.httpService.get('http://api.currencylayer.com/live?access_key=ad0edc64d71e03ba9930d54aaeb63e5d').toPromise().then(resp => {
                return resp.data;

            });
            switch (`${fromCurrency}${toCurrency}`) {
                case "USDEUR":
                    Value = amountToConvert * rates.quotes["USDEUR"];
                    break;
                case "USDCHF":
                    Value = amountToConvert * rates.quotes["USDCHF"];
                    break;
                case "EURUSD":
                    Value = amountToConvert / rates.quotes["USDEUR"];
                    break;
                case "CHFUSD":
                    Value = amountToConvert / rates.quotes["USDCHF"];
                    break;
                case "CHFEUR":
                    Value = (amountToConvert / rates.quotes["USDCHF"]) * rates.quotes["USDEUR"];
                    break;
                case "EURCHF":
                    Value = (amountToConvert / rates.quotes["USDEUR"]) * rates.quotes["USDCHF"];
                    break;
                default:
                    throw new BadRequestException("Currencies Avaible : USD,EUR,CHF");
            }

            console.log(Value);
            return (Value);

        } catch (err) {
            console.log(err)
        };

    }
    async createConversion(conversionInputs): Promise<Converter> {
        const { fromCurrency, toCurrency, amountToConvert } = conversionInputs;
        const value = await this.Convert(conversionInputs);
        if (value !== null&& value!==undefined){
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        const conversiondatenow = (year + "-" + month + "-" + date + " ");

        const from = amountToConvert + fromCurrency;
        const to = value + toCurrency;
        const createdConversion = new this.converterModel({
            fromCurrency:from,
            toCurrency:to,
            conversionDate:conversiondatenow
        });
        console.log(createdConversion);
        return createdConversion.save();}
        else{
            throw new BadRequestException("conversion error")
        }
    }
    async getConversions(): Promise<Converter[]> {
        return await this.converterModel.find().exec();
    }
}
