import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class IdTelegram {
  @Prop()
  telegram: string;
}

export const IdTelegramSchema = SchemaFactory.createForClass(IdTelegram);
