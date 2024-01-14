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
const telegraf_1 = require("telegraf");
const post_schema_1 = require("./schemas/post.schema");
let PostsService = class PostsService {
    constructor(idTelegramModel, tokenTelegramBotModel, postsModel) {
        this.idTelegramModel = idTelegramModel;
        this.tokenTelegramBotModel = tokenTelegramBotModel;
        this.postsModel = postsModel;
        this.bot = new telegraf_1.Telegraf("6731433333:AAExxd3kriL55m90XQcN53gCmdXhtImxHZY");
        this.bot.start((ctx) => ctx.reply("Welcome"));
        this.bot.on("channel_post", async (ctx) => {
            try {
                if (ctx.update.channel_post?.photo) {
                    const photo = ctx.update.channel_post?.photo;
                    if (ctx.update.channel_post?.media_group_id) {
                        const mediagroup = ctx.update.channel_post?.media_group_id;
                        const checkMediaGroup = await this.postsModel
                            .findOne({
                            mediagroup: mediagroup,
                        })
                            .exec();
                        console.log(checkMediaGroup);
                        if (checkMediaGroup) {
                            const check = await ctx.telegram.getFileLink(photo[photo.length - 1].file_id);
                            await this.postsModel.findOneAndUpdate({ _id: checkMediaGroup._id }, { photo: [...checkMediaGroup.photo, check.href] });
                        }
                        else {
                            const check = await ctx.telegram.getFileLink(photo[photo.length - 1].file_id);
                            await this.postsModel.create({
                                photo: [check.href],
                                mediagroup: mediagroup,
                                text: ctx.update.channel_post?.photo.caption
                                    ? ctx.update.channel_post?.photo.caption
                                    : "",
                            });
                        }
                    }
                }
            }
            catch (err) {
                console.log(err);
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