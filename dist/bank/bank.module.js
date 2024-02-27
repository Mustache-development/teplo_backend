"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankModule = void 0;
const common_1 = require("@nestjs/common");
const bank_service_1 = require("./bank.service");
const bank_controller_1 = require("./bank.controller");
const axios_1 = require("@nestjs/axios");
const mongoose_1 = require("@nestjs/mongoose");
const bank_schemas_1 = require("./schemas/bank.schemas");
const bank_gateway_1 = require("../bank-whook/bank.gateway");
const token_monobank_schema_1 = require("../admin/schemas/token-monobank.schema");
let BankModule = class BankModule {
};
exports.BankModule = BankModule;
exports.BankModule = BankModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            mongoose_1.MongooseModule.forFeature([
                { name: "Bank", schema: bank_schemas_1.BankSchema },
                { name: "TokenMonobank", schema: token_monobank_schema_1.TokenMonobankSchema },
            ]),
        ],
        controllers: [bank_controller_1.BankController],
        providers: [bank_service_1.BankService, bank_gateway_1.BankGateway],
    })
], BankModule);
//# sourceMappingURL=bank.module.js.map