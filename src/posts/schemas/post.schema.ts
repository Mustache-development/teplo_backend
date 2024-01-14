import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Posts {
  @Prop({ default: "" })
  text: string;

  @Prop({ default: [] })
  photo: [];

  @Prop({ default: "" })
  mediagroup: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
