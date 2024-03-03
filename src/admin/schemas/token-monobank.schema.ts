import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class TokenMonobank {
  @Prop()
  token: string;
  @Prop({ type: String })
  activeJar: { type: string; default: "0" };
  @Prop({ type: [Object] })
  jars: [
    {
      id: string;
      title: string;
    },
  ];
}

export const TokenMonobankSchema = SchemaFactory.createForClass(TokenMonobank);
