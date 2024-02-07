import { Module } from "@nestjs/common";
import { BankGateway } from "./bank.gateway";
import { BankWebHookController } from "./bank-whook.controller";

@Module({
  imports: [],
  controllers: [BankWebHookController],
  providers: [BankGateway],
})
export class BankWebHookModule {}
