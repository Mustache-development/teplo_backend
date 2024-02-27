import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TokenModule } from "src/token/token.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth, AuthSchema } from "src/auth/schemas/auth.schema";
import { Forgot, ForgotSchema } from "src/auth/schemas/forgot.schema";
import { IdTelegram, IdTelegramSchema } from "./schemas/id-telegram.schema";
import {
  TokenTelegramBot,
  TokenTelegramBotSchema,
} from "./schemas/token-telegram-bot.schema";
import {
  TokenMonobank,
  TokenMonobankSchema,
} from "./schemas/token-monobank.schema";

@Module({
  imports: [
    HttpModule,
    TokenModule,
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: IdTelegram.name, schema: IdTelegramSchema },
      { name: TokenTelegramBot.name, schema: TokenTelegramBotSchema },
      { name: TokenMonobank.name, schema: TokenMonobankSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
