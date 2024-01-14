import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class TokenMonobank {
  @Prop()
  token: string;
}

export const TokenMonobankSchema = SchemaFactory.createForClass(TokenMonobank);
