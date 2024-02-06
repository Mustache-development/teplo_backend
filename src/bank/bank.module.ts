import { Module } from "@nestjs/common";
import { BankService } from "./bank.service";
import { BankController } from "./bank.controller";
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";
import { BankSchema } from "./schemas/bank.schemas";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: "Bank", schema: BankSchema }]),
  ],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
