import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Forgot {
  @Prop()
  email: string;

  @Prop()
  code: string;
}

export const ForgotSchema = SchemaFactory.createForClass(Forgot);
