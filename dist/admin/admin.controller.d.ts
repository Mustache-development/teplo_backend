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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AdminService } from "./admin.service";
import { Request } from "express";
import { UpdatePasswordDto } from "./dto/update-password.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    updateEmail(req: Request, args: {
        newEmail: string;
    }): Promise<{
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
    updateIdTelegram(req: Request, args: {
        newIdTelegram: string;
    }): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    updateTokenTelegramBot(req: Request, args: {
        newTokenTelegramBot: string;
    }): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    updateTokenMonobank(req: Request, data: {
        token: string;
    }): Promise<{
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
    updateJarMonobank(req: Request, data: {
        jarId: string;
    }): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    createBlock(req: Request, data: {
        title: string;
        text: string;
        photos: [string];
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/help-block.schema").HelpBlock> & import("./schemas/help-block.schema").HelpBlock & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    getAllBlocks(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/help-block.schema").HelpBlock> & import("./schemas/help-block.schema").HelpBlock & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    updateBlock(id: string, req: Request, data: {
        id: string;
        title: string;
        text: string;
        photos: [string];
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/help-block.schema").HelpBlock> & import("./schemas/help-block.schema").HelpBlock & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    deleteBlock(id: string, req: Request): Promise<string | {
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
}
