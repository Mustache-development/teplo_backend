import { Module } from "@nestjs/common";
import { BankService } from "./bank.service";
import { BankController } from "./bank.controller";
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";
import { BankSchema } from "./schemas/bank.schemas";
import { BankGateway } from "src/bank-whook/bank.gateway";
import { TokenMonobankSchema } from "src/admin/schemas/token-monobank.schema";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: "Bank", schema: BankSchema },
      { name: "TokenMonobank", schema: TokenMonobankSchema },
    ]),
  ],
  controllers: [BankController],
  providers: [BankService, BankGateway],
})
export class BankModule {}
