import { Controller, Post, Body, Get } from "@nestjs/common";
import { BankGateway } from "./bank.gateway";

@Controller("api/bankWebHook")
export class BankWebHookController {
  constructor(private readonly BankGateway: BankGateway) {}

  @Post()
  async createPost(@Body() webHook: any) {
    const StatementItem = {
      balance: webHook.data.statementItem.balance.toFixed(2),
      transaction: {
        trans_id: webHook.data.statementItem.id,
        trans_type:
          webHook.data.statementItem.amount > 0 ? "Зарахування" : "Списання",
        trans_amount: (webHook.data.statementItem.amount / 100).toFixed(2),
        trans_date: webHook.data.statementItem.time,
      },
    };

    this.BankGateway.handlePost(StatementItem);
    return { msg: "Post created" };
  }

  @Get()
  verificationURL(): { message: string } {
    const data = { message: "Success!" };
    return data;
  }
}
