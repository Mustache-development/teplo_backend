import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { Request } from "express";
import { ForgotDto } from "./dto/forgot.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    logout(request: Request): Promise<{
        status: number;
        message: string;
        code?: undefined;
    } | {
        code: number;
        message: string;
        status?: undefined;
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
    forgotPassword(args: {
        email: string;
    }): Promise<{
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
