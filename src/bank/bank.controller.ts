import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { BankService } from "./bank.service";

@Controller("api/bank")
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  getStatement() {
    return this.bankService.getStatement();
  }
}
