import { Injectable } from "@nestjs/common";
//import { CreateBankDto } from "./dto/create-bank.dto";
//import mongoose from "mongoose";
//import { InjectModel } from "@nestjs/mongoose";
import { catchError, firstValueFrom, lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Bank } from "./schemas/bank.schemas";
//import { AxiosResponse } from "axios";
import { config } from "dotenv";
config();

@Injectable()
export class BankService {
  constructor(
    private readonly httpService: HttpService
    //@InjectModel("Bank")
    //private bankModel: mongoose.Model<Bank>
  ) {}

  statementURL = "https://api.monobank.ua/personal/statement";
  webHookPostUrl = "https://api.monobank.ua/personal/webhook";
  webHookUrl = process.env.BASE_WEB_HOOK_URL + "/api/bankWebHook";

  token = process.env.X_TOKEN;
  BANK_ACCOUNT = !process.env.BANK_ACCOUNT ? "/0" : process.env.BANK_ACCOUNT;

  //create(createBankDto: CreateBankDto) {
  //  return "This action adds a new bank";
  //}

  async getStatement(): Promise<any> {
    const currentDate = new Date();
    const to = Math.floor(currentDate.getTime() / 1000);
    const from = to - 2682000;

    //
    const webHookData = {
      webHookUrl: this.webHookUrl,
    };

    try {
      await firstValueFrom(
        this.httpService.post(this.webHookUrl, JSON.stringify(webHookData), {
          headers: {
            "X-Token": this.token,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }

    //
    //console.log(
    //  await lastValueFrom(
    //    this.httpService
    //      .get<any>("https://api.monobank.ua/personal/client-info", {
    //        headers: { "X-Token": this.token },
    //      })
    //      .pipe(
    //        catchError((error) => {
    //          console.error(error.response.data);
    //          throw "An error happened!";
    //        })
    //      )
    //  )
    //);
    //

    const { data } = await lastValueFrom(
      this.httpService
        .get<any>(
          this.statementURL + this.BANK_ACCOUNT + "/" + from + "/" + to,
          {
            headers: { "X-Token": this.token },
          }
        )
        .pipe(
          catchError((error) => {
            console.error(error.response.data);
            throw "An error happened!";
          })
        )
    );

    const transactions = data.map(function (transaction) {
      return {
        trans_id: transaction.id,
        trans_type: transaction.amount > 0 ? "Зарахування" : "Списання",
        trans_amount: (transaction.amount / 100).toFixed(2),
        trans_date: transaction.time,
      };
    });

    const statement = {
      balance: (data[0].balance / 100).toFixed(2),
      transactions: transactions,
    };

    //на Моно направить адрес для WH
    //запустить WS и передать данные

    return statement;
  }
}
