import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BankService } from "./bank.service";
import { CreateBankDto } from "./dto/create-bank.dto";
import { UpdateBankDto } from "./dto/update-bank.dto";

@Controller("api/bank")
export class BankController {
  constructor(private readonly bankService: BankService) {}

  //@Post()
  //create(@Body() createBankDto: CreateBankDto) {
  //  return this.bankService.create(createBankDto);
  //}

  @Get()
  getStatement() {
    return this.bankService.getStatement();
  }

  //@Get("/:account")
  //getStatement(@Param("account") account: string) {
  //  return this.bankService.getStatement(account);
  //}

  //@Patch(":id")
  //update(@Param("id") id: string, @Body() updateBankDto: UpdateBankDto) {
  //  return this.bankService.update(+id, updateBankDto);
  //}

  //@Delete(":id")
  //remove(@Param("id") id: string) {
  //  return this.bankService.remove(+id);
  //}
}
