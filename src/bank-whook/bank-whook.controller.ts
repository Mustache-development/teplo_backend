import { Controller, Post, Body, Get } from "@nestjs/common";
import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TokenMonobank } from "../admin/schemas/token-monobank.schema";
import { BankGateway } from "./bank.gateway";

@Controller("api/bankWebHook")
export class BankWebHookController {
  constructor(
    @InjectModel(TokenMonobank.name)
    private tokenMonobankModel: mongoose.Model<TokenMonobank>,
    private readonly BankGateway: BankGateway
  ) { }

  @Post()
  async createPost(@Body() webHook: any) {
    try {
      console.log("Received webhook from Monobank:", webHook);
      const checkMonobank = await this.tokenMonobankModel.find();
      if (checkMonobank.length === 0) {
        return {
          code: 400,
          message: "Invalid token",
        };
      }

      const monoToken = checkMonobank[0].token;
      if (!monoToken) {
        return {
          code: 400,
          message: "Invalid token",
        };
      }

      const jar = !checkMonobank[0].activeJar
        ? "0"
        : checkMonobank[0].activeJar;

      const StatementItem = {
        balance: (webHook.data.statementItem.balance / 100).toFixed(0),
        transaction: {
          trans_id: webHook.data.statementItem.id,
          trans_type:
            webHook.data.statementItem.amount > 0 ? "Зарахування" : "Списання",
          trans_amount: (webHook.data.statementItem.amount / 100).toFixed(0),
          trans_date: webHook.data.statementItem.time,
        },
      };

      if (jar === webHook.data.account) {
        this.BankGateway.handlePost(StatementItem);
      }

      return { msg: "Post created" };
    } catch (error) {
      return {
        code: 500,
        message: "error server",
      };
    }
  }

  @Get()
  verificationURL(): { message: string } {
    const data = { message: "Success!" };
    return data;
  }
}
