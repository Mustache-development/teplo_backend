import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class HelpBlock {
  @Prop()
  title: string;
  @Prop({ type: String })
  text: { type: string; default: "" };
  @Prop({ type: [] })
  photos: string[];
}

export const HelpBlockSchema = SchemaFactory.createForClass(HelpBlock);
