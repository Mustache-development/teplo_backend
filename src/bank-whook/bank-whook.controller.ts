import { Controller, Post, Body, Get } from "@nestjs/common";
import { BankGateway } from "./bank.gateway";

@Controller("api/bankWebHook")
export class BankWebHookController {
  constructor(private readonly BankGateway: BankGateway) {}

  @Post()
  createPost(@Body() data: any): string {
    console.log(data);
    // Обробляйте дані POST-запиту

    this.BankGateway.handlePost(data);
    return "Post created";
  }

  @Get()
  verificationURL(): { message: string } {
    const data = { message: "Success!" };
    return data;
  }
}
