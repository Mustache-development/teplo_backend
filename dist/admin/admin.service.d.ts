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
import { TokenService } from "src/token/token.service";
import { Auth } from "src/auth/schemas/auth.schema";
import mongoose from "mongoose";
import { Request } from "express";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { IdTelegram } from "./schemas/id-telegram.schema";
import { TokenMonobank } from "./schemas/token-monobank.schema";
import { TokenTelegramBot } from "./schemas/token-telegram-bot.schema";
import { HttpService } from "@nestjs/axios";
export declare class AdminService {
    private readonly tokenService;
    private authModel;
    private idTelegramModel;
    private tokenTelegramBotModel;
    private tokenMonobankModel;
    private readonly httpService;
    constructor(tokenService: TokenService, authModel: mongoose.Model<Auth>, idTelegramModel: mongoose.Model<IdTelegram>, tokenTelegramBotModel: mongoose.Model<TokenTelegramBot>, tokenMonobankModel: mongoose.Model<TokenMonobank>, httpService: HttpService);
    updateEmail(req: Request, newEmail: string): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    updatePassword(req: Request, data: UpdatePasswordDto): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    updateIdTelegram(req: Request, newIdTelegram: string): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    updateTokenTelegramBot(req: Request, newTokenTelegramBot: string): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    updateTokenMonobank(req: any, newTokenMonobank: string): Promise<{
        status: number;
        message: string;
        code?: undefined;
        jars?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
        jars?: undefined;
    } | {
        code: number;
        message: string;
        jars: any[];
        status?: undefined;
    }>;
    updateActiveJar(req: any, newActiveJar: string): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
}
