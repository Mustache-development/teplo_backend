import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class TokenBlacklist {
  @Prop()
  token: string;
}

export const TokenBlacklistSchema =
  SchemaFactory.createForClass(TokenBlacklist);
