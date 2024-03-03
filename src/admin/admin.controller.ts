import { Controller, Body, Put, Query, Req } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { ApiHeaders, ApiQuery } from "@nestjs/swagger";
import { Request } from "express";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("api/admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiHeaders([{ name: "Authorization" }])
  @ApiQuery({ name: "newEmail" })
  @Put("email")
  updateEmail(@Req() req: Request, @Query() args: { newEmail: string }) {
    return this.adminService.updateEmail(req, args.newEmail);
  }

  @ApiHeaders([{ name: "Authorization" }])
  @Put("password")
  updatePassword(@Req() req: Request, @Body() data: UpdatePasswordDto) {
    return this.adminService.updatePassword(req, data);
  }

  @ApiHeaders([{ name: "Authorization" }])
  @ApiQuery({ name: "newIdTelegram" })
  @Put("id-telegram")
  updateIdTelegram(
    @Req() req: Request,
    @Query() args: { newIdTelegram: string }
  ) {
    return this.adminService.updateIdTelegram(req, args.newIdTelegram);
  }

  @ApiHeaders([{ name: "Authorization" }])
  @ApiQuery({ name: "newTokenTelegramBot" })
  @Put("token-telegram-bot")
  updateTokenTelegramBot(
    @Req() req: Request,
    @Query() args: { newTokenTelegramBot: string }
  ) {
    return this.adminService.updateTokenTelegramBot(
      req,
      args.newTokenTelegramBot
    );
  }

  @ApiHeaders([{ name: "Authorization" }])
  @Put("token-monobank")
  updateTokenMonobank(@Req() req: Request, @Body() data: { token: string }) {
    return this.adminService.updateTokenMonobank(req, data.token);
  }

  @ApiHeaders([{ name: "Authorization" }])
  @Put("jar-monobank")
  updateJarMonobank(@Req() req: Request, @Body() data: { jarId: string }) {
    return this.adminService.updateActiveJar(req, data.jarId);
  }
}
