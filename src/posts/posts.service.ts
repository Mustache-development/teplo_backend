import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IdTelegram } from "src/admin/schemas/id-telegram.schema";
import { TokenTelegramBot } from "src/admin/schemas/token-telegram-bot.schema";
import { Composer, Context, Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";
import { Posts } from "./schemas/post.schema";

@Injectable()
export class PostsService {
  private bot: Telegraf;
  private stage: Composer<Context>;
  private isProcessing: boolean = false;
  constructor(
    @InjectModel(IdTelegram.name)
    private idTelegramModel: mongoose.Model<IdTelegram>,
    @InjectModel(TokenTelegramBot.name)
    private tokenTelegramBotModel: mongoose.Model<TokenTelegramBot>,
    @InjectModel(Posts.name)
    private postsModel: mongoose.Model<Posts>
  ) {
    this.bot = new Telegraf("6731433333:AAExxd3kriL55m90XQcN53gCmdXhtImxHZY");

    this.bot.start((ctx) => ctx.reply("Welcome"));

    this.bot.on("channel_post", async (ctx) => {
      try {
        if (this.isProcessing) {
          console.log("Already processing. Waiting...");
          while (this.isProcessing) {
            // Ждем завершения предыдущей обработки
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Пауза в 1 секунду
          }
        }

        this.isProcessing = true;
        if ((ctx.update.channel_post as any)?.photo) {
          const photo = (ctx.update.channel_post as any)?.photo;

          if ((ctx.update.channel_post as any)?.media_group_id) {
            const mediagroup = (ctx.update.channel_post as any)?.media_group_id;

            const checkMediaGroup = await this.postsModel
              .findOne({
                mediagroup: mediagroup,
              })
              .exec();
            console.log(checkMediaGroup);

            if (checkMediaGroup) {
              const check = await ctx.telegram.getFileLink(
                photo[photo.length - 1].file_id
              );
              await this.postsModel.findOneAndUpdate(
                { _id: checkMediaGroup._id },
                { photo: [...checkMediaGroup.photo, check.href] }
              );
            } else {
              const check = await ctx.telegram.getFileLink(
                photo[photo.length - 1].file_id
              );
              await this.postsModel.create({
                photo: [check.href],
                mediagroup: mediagroup,
                text: (ctx.update.channel_post as any)?.photo.caption
                  ? (ctx.update.channel_post as any)?.photo.caption
                  : "",
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isProcessing = false;
      }
    });
    this.bot.launch();
  }

  async getPosts() {
    try {
      const allPosts = await this.postsModel.find();

      return {
        code: 200,
        posts: allPosts,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: "error server",
      };
    }
  }
}
