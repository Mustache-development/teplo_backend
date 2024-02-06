import { HttpService } from "@nestjs/axios";
export declare class BankService {
    private readonly httpService;
    constructor(httpService: HttpService);
    statementURL: string;
    webHookPostUrl: string;
    webHookUrl: string;
    token: string;
    BANK_ACCOUNT: string;
    getStatement(): Promise<any>;
}
