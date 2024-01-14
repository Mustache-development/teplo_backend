import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  IdTelegram,
  IdTelegramSchema,
} from "src/admin/schemas/id-telegram.schema";
import {
  TokenTelegramBot,
  TokenTelegramBotSchema,
} from "src/admin/schemas/token-telegram-bot.schema";
import { Posts, PostsSchema } from "./schemas/post.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostsSchema },
      { name: IdTelegram.name, schema: IdTelegramSchema },
      { name: TokenTelegramBot.name, schema: TokenTelegramBotSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
