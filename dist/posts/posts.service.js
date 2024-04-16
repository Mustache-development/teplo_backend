"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const id_telegram_schema_1 = require("../admin/schemas/id-telegram.schema");
const token_telegram_bot_schema_1 = require("../admin/schemas/token-telegram-bot.schema");
const post_schema_1 = require("./schemas/post.schema");
const fs = require("fs");
const axios_1 = require("axios");
const TelegramBot = require("node-telegram-bot-api");
let PostsService = class PostsService {
    constructor(idTelegramModel, tokenTelegramBotModel, postsModel) {
        this.idTelegramModel = idTelegramModel;
        this.tokenTelegramBotModel = tokenTelegramBotModel;
        this.postsModel = postsModel;
        this.bot = TelegramBot;
        this.isProcessing = false;
        this.initialize();
    }
    async initialize() {
        try {
            const token = await this.tokenTelegramBotModel.findOne();
            if (!token)
                return;
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
                        const response = await axios_1.default.get(fileLink, {
                            responseType: "arraybuffer",
                        });
                        if (!fs.existsSync("upload")) {
                            fs.mkdirSync("upload");
                        }
                        fs.writeFileSync(`upload/${photo[photo.length - 1].file_unique_id}.jpg`, response.data);
                        const photoUrl = `${process.env.SERVER_URL}/upload/${photo[photo.length - 1].file_unique_id}.jpg`;
                        if (checkMediaGroup) {
                            await this.postsModel.findOneAndUpdate({ _id: checkMediaGroup._id }, {
                                photo: [...checkMediaGroup.photo, photoUrl],
                            });
                        }
                        else {
                            await this.postsModel.create({
                                photo: [photoUrl],
                                mediagroup: mediaGroupId,
                                text: msg.caption || "",
                            });
                        }
                    }
                    else {
                        await this.postsModel.create({
                            text: msg.text || "",
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    this.isProcessing = false;
                }
            });
        }
        catch (err) {
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
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(id_telegram_schema_1.IdTelegram.name)),
    __param(1, (0, mongoose_1.InjectModel)(token_telegram_bot_schema_1.TokenTelegramBot.name)),
    __param(2, (0, mongoose_1.InjectModel)(post_schema_1.Posts.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map