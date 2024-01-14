import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class TokenTelegramBot {
  @Prop()
  token: string;
}

export const TokenTelegramBotSchema =
  SchemaFactory.createForClass(TokenTelegramBot);
