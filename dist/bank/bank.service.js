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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const token_monobank_schema_1 = require("../admin/schemas/token-monobank.schema");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let BankService = class BankService {
    constructor(httpService, tokenMonobankModel) {
        this.httpService = httpService;
        this.tokenMonobankModel = tokenMonobankModel;
        this.statementURL = "https://api.monobank.ua/personal/statement/";
        this.webHookPostUrl = "https://api.monobank.ua/personal/webhook";
        this.webHookUrl = process.env.SERVER_URL + "/api/bankWebHook";
    }
    async getStatement() {
        const checkMonobank = await this.tokenMonobankModel.find();
        if (checkMonobank.length === 0) {
            return {
                code: 400,
                message: "Check Monobank token, please.",
            };
        }
        const monoToken = checkMonobank[0].token;
        if (!monoToken) {
            return {
                code: 400,
                message: "Check Monobank token, please.",
            };
        }
        const jar = !checkMonobank[0].activeJar ? "0" : checkMonobank[0].activeJar;
        const currentDate = new Date();
        const to = Math.floor(currentDate.getTime() / 1000);
        const from = to - 2682000;
        if (this.webHookUrl) {
            const webHookData = {
                webHookUrl: this.webHookUrl,
            };
            try {
                await (0, rxjs_1.lastValueFrom)(this.httpService.post(this.webHookPostUrl, JSON.stringify(webHookData), {
                    headers: {
                        "X-Token": monoToken,
                    },
                }));
            }
            catch (error) {
                console.log("invalid webHookUrl");
            }
        }
        else {
            console.log("Write to environment 'SERVER_URL' ");
        }
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService
            .get(this.statementURL + jar + "/" + from + "/" + to, {
            headers: { "X-Token": monoToken },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            console.error(error.response.data);
            throw "An error happened!";
        })));
        if (data.length > 0) {
            const transactions = data.map(function (transaction) {
                return {
                    trans_id: transaction.id,
                    trans_type: transaction.amount > 0 ? "Зарахування" : "Списання",
                    trans_amount: (transaction.amount / 100).toFixed(2),
                    trans_date: transaction.time,
                };
            });
            return {
                balance: (data[0].balance / 100).toFixed(2),
                transactions: transactions,
            };
        }
        else {
            return {
                balance: (0 / 100).toFixed(2),
                transactions: [],
            };
        }
    }
};
exports.BankService = BankService;
exports.BankService = BankService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(token_monobank_schema_1.TokenMonobank.name)),
    __metadata("design:paramtypes", [axios_1.HttpService, mongoose_1.default.Model])
], BankService);
//# sourceMappingURL=bank.service.js.map