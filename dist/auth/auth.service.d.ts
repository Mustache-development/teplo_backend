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
import { OnModuleInit } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { TokenService } from "src/token/token.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import mongoose from "mongoose";
import { Auth } from "./schemas/auth.schema";
import { Request } from "express";
import { ForgotDto } from "./dto/forgot.dto";
export declare class AuthService implements OnModuleInit {
    private readonly tokenService;
    private authModel;
    private forgotModel;
    constructor(tokenService: TokenService, authModel: mongoose.Model<Auth>, forgotModel: mongoose.Model<Auth>);
    onModuleInit(): Promise<void>;
    create(data: CreateAuthDto): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    login(data: LoginAuthDto): Promise<{
        status: number;
        message: string;
        code?: undefined;
        token?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
        token?: undefined;
    } | {
        code: number;
        token: string;
        status?: undefined;
        message?: undefined;
    }>;
    verify(request: Request): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    logout(request: Request): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    forgotPassword(email: string): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
    resetPassword(data: ForgotDto): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
    }>;
}
