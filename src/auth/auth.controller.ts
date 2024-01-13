import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { ApiHeaders, ApiQuery } from "@nestjs/swagger";
import { Request } from "express";
import { ForgotDto } from "./dto/forgot.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  create(@Body() data: CreateAuthDto) {
    return this.authService.create(data);
  }

  @Post("login")
  login(@Body() data: LoginAuthDto) {
    return this.authService.login(data);
  }

  @ApiHeaders([{ name: "Authorization" }])
  @Get("logout")
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }

  @ApiHeaders([{ name: "Authorization" }])
  @Get("verify")
  verify(@Req() request: Request) {
    return this.authService.verify(request);
  }

  @ApiQuery({ name: "email" })
  @Get("forgot-password")
  forgotPassword(@Query() args: { email: string }) {
    return this.authService.forgotPassword(args.email);
  }

  @Post("reset-password")
  resetPassword(@Body() data: ForgotDto) {
    return this.authService.resetPassword(data);
  }
}
