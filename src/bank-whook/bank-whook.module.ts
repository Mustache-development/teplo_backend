import { Module } from "@nestjs/common";
import { BankGateway } from "./bank.gateway";
import { BankWebHookController } from "./bank-whook.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { TokenMonobankSchema } from "src/admin/schemas/token-monobank.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "TokenMonobank", schema: TokenMonobankSchema },
    ]),
  ],
  controllers: [BankWebHookController],
  providers: [BankGateway],
})
export class BankWebHookModule {}
