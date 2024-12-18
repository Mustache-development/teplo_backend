import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IdTelegram } from "src/admin/schemas/id-telegram.schema";
import { TokenTelegramBot } from "src/admin/schemas/token-telegram-bot.schema";
import { Posts } from "./schemas/post.schema";
import * as fs from "fs";
import axios from "axios";
const sharp = require('sharp');
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

            const image = sharp(response.data);
            const metadata = await image.metadata();
            const base64Image = await image.toBuffer().then(buffer => buffer.toString('base64'));

            const imageData = {
              base64Image,
              width: metadata.width || 800,
              height: metadata.height || 600,
            };

            if (checkMediaGroup) {
              await this.postsModel.findOneAndUpdate(
                { _id: checkMediaGroup._id },
                {
                  $push: { photo: imageData },
                }
              );
            } else {
              await this.postsModel.create({
                photo: [imageData],
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

  async getPosts(limit: number, offset: number) {
    console.log("Start getPosts");
    try {
      const posts = await this.postsModel
        .find()
        .sort({ _id: -1 })
        .skip(offset)
        .limit(limit)
        .exec();

      const totalPosts = await this.postsModel.countDocuments();
      console.log('posts: ', posts);

      return {
        code: 200,
        posts: posts,
        totalPosts,
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
