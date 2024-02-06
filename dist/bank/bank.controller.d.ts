import { BankService } from "./bank.service";
export declare class BankController {
    private readonly bankService;
    constructor(bankService: BankService);
    getStatement(): Promise<any>;
}
