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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../token/token.service");
const auth_schema_1 = require("../auth/schemas/auth.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const id_telegram_schema_1 = require("./schemas/id-telegram.schema");
const token_monobank_schema_1 = require("./schemas/token-monobank.schema");
const token_telegram_bot_schema_1 = require("./schemas/token-telegram-bot.schema");
const help_block_schema_1 = require("./schemas/help-block.schema");
const bcrypt = require("bcryptjs");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AdminService = class AdminService {
    constructor(tokenService, authModel, idTelegramModel, tokenTelegramBotModel, tokenMonobankModel, helpBlockModel, httpService) {
        this.tokenService = tokenService;
        this.authModel = authModel;
        this.idTelegramModel = idTelegramModel;
        this.tokenTelegramBotModel = tokenTelegramBotModel;
        this.tokenMonobankModel = tokenMonobankModel;
        this.helpBlockModel = helpBlockModel;
        this.httpService = httpService;
    }
    async updateEmail(req, newEmail) {
        const token = this.tokenService.getBearerToken(req);
        if (!newEmail || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const checkAdmin = await this.authModel.findOne({
                email: tokenData.data.email,
            });
            if (!checkAdmin) {
                return {
                    code: 404,
                    message: "not found",
                };
            }
            await this.authModel.findOneAndUpdate({ _id: checkAdmin._id }, { email: newEmail });
            return {
                code: 200,
                message: "email update",
            };
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async updatePassword(req, data) {
        const token = this.tokenService.getBearerToken(req);
        if (!data.newPassword || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const checkAdmin = await this.authModel.findOne({
                email: tokenData.data.email,
            });
            if (!checkAdmin) {
                return {
                    code: 404,
                    message: "not found",
                };
            }
            if (bcrypt.compareSync(data.currentPassword, checkAdmin.password)) {
                await this.authModel.findOneAndUpdate({ _id: checkAdmin._id }, { password: bcrypt.hashSync(data.newPassword) });
                return {
                    code: 200,
                    message: "password update",
                };
            }
            else {
                return {
                    code: 401,
                    message: "password is not correct",
                };
            }
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async updateIdTelegram(req, newIdTelegram) {
        const token = this.tokenService.getBearerToken(req);
        if (!newIdTelegram || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const checkIdTelegram = await this.idTelegramModel.find();
            if (checkIdTelegram.length > 0) {
                await this.idTelegramModel.findOneAndUpdate({ _id: checkIdTelegram[0]._id }, { telegram: newIdTelegram });
            }
            else {
                await this.idTelegramModel.create({ telegram: newIdTelegram });
            }
            return {
                code: 200,
                message: "id telegram update",
            };
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async updateTokenTelegramBot(req, newTokenTelegramBot) {
        const token = this.tokenService.getBearerToken(req);
        if (!newTokenTelegramBot || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const checkTokenTelegramBot = await this.tokenTelegramBotModel.find();
            if (checkTokenTelegramBot.length > 0) {
                await this.tokenTelegramBotModel.findOneAndUpdate({ _id: checkTokenTelegramBot[0]._id }, { token: newTokenTelegramBot });
            }
            else {
                await this.tokenTelegramBotModel.create({ token: newTokenTelegramBot });
            }
            return {
                code: 200,
                message: "token telegram update",
            };
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async updateTokenMonobank(req, newTokenMonobank) {
        const token = this.tokenService.getBearerToken(req);
        if (!newTokenMonobank || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService
                .get("https://api.monobank.ua/personal/client-info", {
                headers: { "X-Token": newTokenMonobank },
            })
                .pipe((0, rxjs_1.catchError)((error) => {
                throw error;
            })));
            let jars = [];
            if (data.jars) {
                jars = data.jars.map(function (jar) {
                    return {
                        id: jar.id,
                        title: jar.title,
                    };
                });
            }
            console.log(jars);
            const checkMonobank = await this.tokenMonobankModel.find();
            if (checkMonobank.length > 0) {
                await this.tokenMonobankModel.findOneAndUpdate({ _id: checkMonobank[0]._id }, {
                    token: newTokenMonobank,
                    jars: jars,
                });
            }
            else {
                await this.tokenMonobankModel.create({
                    token: newTokenMonobank,
                    jars: jars,
                });
            }
            console.log(await this.tokenMonobankModel.find());
            return {
                code: 200,
                message: "Token monobank update. Check jar, please.",
                jars,
            };
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async updateActiveJar(req, newActiveJar) {
        const token = this.tokenService.getBearerToken(req);
        if (!newActiveJar || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const checkMonobank = await this.tokenMonobankModel.find();
            const idArr = checkMonobank[0].jars.map(function (jar) {
                return jar.id;
            });
            if (checkMonobank.length === 0 && !idArr.includes(newActiveJar)) {
                throw "Invalid Monobank token or jar";
            }
            await this.tokenMonobankModel.findOneAndUpdate({ _id: checkMonobank[0]._id }, { activeJar: newActiveJar });
            return {
                code: 200,
                message: "Active jar monobank update",
            };
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async createBlock(req, newBlock) {
        const token = this.tokenService.getBearerToken(req);
        if (!newBlock || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const helpBlock = await this.helpBlockModel.create(newBlock);
            return helpBlock;
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async getAllBlocks(req) {
        const token = this.tokenService.getBearerToken(req);
        if (!token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const helpBlocks = await this.helpBlockModel.find();
            return helpBlocks;
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async updateBlock(id, req, data) {
        const token = this.tokenService.getBearerToken(req);
        if (!id || !token || !data) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            const helpBlock = await this.helpBlockModel.findByIdAndUpdate(id, {
                ...data,
            });
            return helpBlock;
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
    async deleteBlock(id, req) {
        const token = this.tokenService.getBearerToken(req);
        if (!id || !token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const tokenData = await this.tokenService.validateJwtToken(token);
            if (!tokenData.authorization) {
                return {
                    code: 401,
                    message: "authorization fail",
                };
            }
            await this.helpBlockModel.findByIdAndDelete(id);
            return "HelpBlock with id = " + id + " was deleted";
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error server",
            };
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(auth_schema_1.Auth.name)),
    __param(2, (0, mongoose_2.InjectModel)(id_telegram_schema_1.IdTelegram.name)),
    __param(3, (0, mongoose_2.InjectModel)(token_telegram_bot_schema_1.TokenTelegramBot.name)),
    __param(4, (0, mongoose_2.InjectModel)(token_monobank_schema_1.TokenMonobank.name)),
    __param(5, (0, mongoose_2.InjectModel)(help_block_schema_1.HelpBlock.name)),
    __metadata("design:paramtypes", [token_service_1.TokenService, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, axios_1.HttpService])
], AdminService);
//# sourceMappingURL=admin.service.js.map