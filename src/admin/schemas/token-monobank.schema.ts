import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class TokenMonobank {
  @Prop()
  token: string;
  @Prop({ type: String })
  activeJar: { type: string; default: "0" };
  @Prop([String])
  jars: string[];
}

export const TokenMonobankSchema = SchemaFactory.createForClass(TokenMonobank);
