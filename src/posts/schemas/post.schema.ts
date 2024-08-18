import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Posts {
  @Prop({ default: "" })
  text: string;

  @Prop({
    type: [
      {
        base64Image: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
    ],
    default: [],
  })
  photo: Array<{
    base64Image: string;
    width: number;
    height: number;
  }>;


  @Prop({ default: "" })
  mediagroup: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
