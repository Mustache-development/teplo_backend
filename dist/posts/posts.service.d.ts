/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose from "mongoose";
import { IdTelegram } from "src/admin/schemas/id-telegram.schema";
import { TokenTelegramBot } from "src/admin/schemas/token-telegram-bot.schema";
import { Posts } from "./schemas/post.schema";
export declare class PostsService {
    private idTelegramModel;
    private tokenTelegramBotModel;
    private postsModel;
    private bot;
    private isProcessing;
    constructor(idTelegramModel: mongoose.Model<IdTelegram>, tokenTelegramBotModel: mongoose.Model<TokenTelegramBot>, postsModel: mongoose.Model<Posts>);
    initialize(): Promise<void>;
    getPosts(): Promise<{
        code: number;
        posts: (mongoose.Document<unknown, {}, Posts> & Posts & {
            _id: mongoose.Types.ObjectId;
        })[];
        message?: undefined;
    } | {
        code: number;
        message: string;
        posts?: undefined;
    }>;
}
