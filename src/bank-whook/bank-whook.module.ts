import { Module } from "@nestjs/common";
import { BankGateway } from "./bank.gateway";

@Module({
  imports: [],
  controllers: [],
  providers: [BankGateway],
})
export class BankWebHookModule {}
