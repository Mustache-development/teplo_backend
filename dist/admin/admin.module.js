"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const token_module_1 = require("../token/token.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../auth/schemas/auth.schema");
const id_telegram_schema_1 = require("./schemas/id-telegram.schema");
const token_telegram_bot_schema_1 = require("./schemas/token-telegram-bot.schema");
const token_monobank_schema_1 = require("./schemas/token-monobank.schema");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            token_module_1.TokenModule,
            mongoose_1.MongooseModule.forFeature([
                { name: auth_schema_1.Auth.name, schema: auth_schema_1.AuthSchema },
                { name: id_telegram_schema_1.IdTelegram.name, schema: id_telegram_schema_1.IdTelegramSchema },
                { name: token_telegram_bot_schema_1.TokenTelegramBot.name, schema: token_telegram_bot_schema_1.TokenTelegramBotSchema },
                { name: token_monobank_schema_1.TokenMonobank.name, schema: token_monobank_schema_1.TokenMonobankSchema },
            ]),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map