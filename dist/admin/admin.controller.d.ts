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
}
