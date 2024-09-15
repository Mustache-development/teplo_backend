import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TokenMonobank } from "src/admin/schemas/token-monobank.schema";
import { catchError, lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { config } from "dotenv";
config();

@Injectable()
export class BankService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(TokenMonobank.name)
    private tokenMonobankModel: mongoose.Model<TokenMonobank>
  ) { }

  statementURL = "https://api.monobank.ua/personal/statement/";
  webHookPostUrl = "https://api.monobank.ua/personal/webhook";
  webHookUrl = process.env.SERVER_URL + "/api/bankWebHook";

  async getStatement(): Promise<any> {
    const checkMonobank = await this.tokenMonobankModel.find();
    if (checkMonobank.length === 0) {
      return {
        code: 400,
        message: "Check Monobank token, please.",
      };
    }

    const monoToken = checkMonobank[0].token;
    if (!monoToken) {
      return {
        code: 400,
        message: "Check Monobank token, please.",
      };
    }

    const jar = !checkMonobank[0].activeJar ? "0" : checkMonobank[0].activeJar;

    const currentDate = new Date();
    const to = Math.floor(currentDate.getTime() / 1000);
    const from = to - 2682000;

    if (this.webHookUrl) {
      const webHookData = {
        webHookUrl: this.webHookUrl,
      };

      try {
        await lastValueFrom(
          this.httpService.post(
            this.webHookPostUrl,
            JSON.stringify(webHookData),
            {
              headers: {
                "X-Token": monoToken,
              },
            }
          )
        );
      } catch (error) {
        console.log("invalid webHookUrl");
      }
    } else {
      console.log("Write to environment 'SERVER_URL' ");
    }

    const { data } = await lastValueFrom(
      this.httpService
        .get<any>(this.statementURL + jar + "/" + from + "/" + to, {
          headers: { "X-Token": monoToken },
        })
        .pipe(
          catchError((error) => {
            console.error(error.response.data);
            throw "An error happened!";
          })
        )
    );

    if (data.length > 0) {
      const transactions = data.map(function (transaction: any) {
        return {
          trans_id: transaction.id,
          trans_type: transaction.amount > 0 ? "Зарахування" : "Списання",
          trans_amount: (transaction.amount / 100).toFixed(0),
          trans_date: transaction.time,
        };
      });

      return {
        balance: (data[0].balance / 100).toFixed(0),
        transactions: transactions,
      };
    } else {
      return {
        balance: (0 / 100).toFixed(0),
        transactions: [],
      };
    }
  }
}
