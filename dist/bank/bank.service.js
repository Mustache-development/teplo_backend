"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let BankService = class BankService {
    constructor(httpService) {
        this.httpService = httpService;
        this.statementURL = "https://api.monobank.ua/personal/statement";
        this.webHookPostUrl = "https://api.monobank.ua/personal/webhook";
        this.webHookUrl = process.env.BASE_WEB_HOOK_URL + "/api/bankWebHook";
        this.token = process.env.X_TOKEN;
        this.BANK_ACCOUNT = !process.env.BANK_ACCOUNT ? "/0" : process.env.BANK_ACCOUNT;
    }
    async getStatement() {
        const currentDate = new Date();
        const to = Math.floor(currentDate.getTime() / 1000);
        const from = to - 2682000;
        const webHookData = {
            webHookUrl: this.webHookUrl,
        };
        try {
            await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.webHookPostUrl, JSON.stringify(webHookData), {
                headers: {
                    "X-Token": this.token,
                },
            }));
        }
        catch (error) {
            console.log(error);
        }
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService
            .get(this.statementURL + this.BANK_ACCOUNT + "/" + from + "/" + to, {
            headers: { "X-Token": this.token },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            console.error(error.response.data);
            throw "An error happened!";
        })));
        const transactions = data.map(function (transaction) {
            return {
                trans_id: transaction.id,
                trans_type: transaction.amount > 0 ? "Зарахування" : "Списання",
                trans_amount: (transaction.amount / 100).toFixed(2),
                trans_date: transaction.time,
            };
        });
        const statement = {
            balance: (data[0].balance / 100).toFixed(2),
            transactions: transactions,
        };
        return statement;
    }
};
exports.BankService = BankService;
exports.BankService = BankService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], BankService);
//# sourceMappingURL=bank.service.js.map