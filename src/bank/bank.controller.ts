import { Controller, Get } from "@nestjs/common";
import { BankService } from "./bank.service";
//import { CreateBankDto } from "./dto/create-bank.dto";
//import { UpdateBankDto } from "./dto/update-bank.dto";

@Controller("api/bank")
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  getStatement() {
    return this.bankService.getStatement();
  }
}
