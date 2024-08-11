import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IdTelegram } from "src/admin/schemas/id-telegram.schema";
import { TokenTelegramBot } from "src/admin/schemas/token-telegram-bot.schema";
import { Posts } from "./schemas/post.schema";
import * as fs from "fs";
import axios from "axios";
const TelegramBot = require("node-telegram-bot-api");

@Injectable()
export class PostsService {
  private bot = TelegramBot;
  private isProcessing: boolean = false;
  constructor(
    @InjectModel(IdTelegram.name)
    private idTelegramModel: mongoose.Model<IdTelegram>,
    @InjectModel(TokenTelegramBot.name)
    private tokenTelegramBotModel: mongoose.Model<TokenTelegramBot>,
    @InjectModel(Posts.name)
    private postsModel: mongoose.Model<Posts>
  ) {
    this.initialize();
  }

  async initialize() {
    try {
      const token = await this.tokenTelegramBotModel.findOne();

      if (!token) return;

      this.bot = new TelegramBot(token.token, { polling: true });

      this.bot.on("channel_post", async (msg) => {
        try {
          if (this.isProcessing) {
            while (this.isProcessing) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          }

          this.isProcessing = true;
          const chatId = msg.chat.id;
          const photo = msg.photo;

          if (photo) {
            const mediaGroupId = msg.media_group_id;
            const checkMediaGroup = await this.postsModel
              .findOne({
                mediagroup: mediaGroupId,
              })
              .exec();

            const photoId = photo[photo.length - 1].file_id;
            const fileLink = await this.bot.getFileLink(photoId);
            const response = await axios.get(fileLink, {
              responseType: "arraybuffer",
            });

            if (!fs.existsSync("upload")) {
              fs.mkdirSync("upload");
            }

            const filePath = `upload/${photo[photo.length - 1].file_unique_id}.jpg`;
            fs.writeFileSync(filePath, response.data);

            if (fs.existsSync(filePath)) {
              console.log(`File saved successfully at ${filePath}`);
            } else {
              console.error(`Failed to save the file at ${filePath}`);
            }

            const photoUrl = `${process.env.SERVER_URL}/upload/${photo[photo.length - 1].file_unique_id
              }.jpg`;

            if (checkMediaGroup) {
              await this.postsModel.findOneAndUpdate(
                { _id: checkMediaGroup._id },
                {
                  photo: [...checkMediaGroup.photo, photoUrl],
                }
              );
            } else {
              await this.postsModel.create({
                photo: [photoUrl],
                mediagroup: mediaGroupId,
                text: msg.caption || "",
              });
            }
          } else {
            await this.postsModel.create({
              text: msg.text || "",
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.isProcessing = false;
        }
      });
    } catch (err) {
      console.log(err);
    }
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
