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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../token/token.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_schema_1 = require("./schemas/auth.schema");
const forgot_schema_1 = require("./schemas/forgot.schema");
const generateRandomCode_1 = require("../methods/generateRandomCode");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(tokenService, authModel, forgotModel) {
        this.tokenService = tokenService;
        this.authModel = authModel;
        this.forgotModel = forgotModel;
    }
    async onModuleInit() {
        const defaultEmail = 'admin@example.com';
        const defaultPassword = 'securepassword';
        const adminUser = await this.authModel.findOne({ email: defaultEmail });
        if (!adminUser) {
            const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
            await this.authModel.create({
                email: defaultEmail,
                password: hashedPassword,
            });
        }
    }
    async create(data) {
        if (!data.email || !data.password) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const checkAdmin = await this.authModel.find();
            if (checkAdmin.length > 0) {
                return {
                    code: 409,
                    message: "This user already exists",
                };
            }
            await this.authModel.create({
                email: data.email,
                password: bcrypt.hashSync(data.password),
            });
            return {
                code: 201,
                message: "admin create",
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
    async login(data) {
        if (!data.email || !data.password) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const checkAdmin = await this.authModel.findOne({ email: data.email });
            if (!checkAdmin) {
                return {
                    code: 404,
                    message: "not found",
                };
            }
            if (bcrypt.compareSync(data.password, checkAdmin.password)) {
                const token = await this.tokenService.generateJwtToken(data.email);
                return {
                    code: 200,
                    token,
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
    async verify(request) {
        const token = this.tokenService.getBearerToken(request);
        if (!token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const checkToken = await this.tokenService.validateJwtToken(token);
            if (checkToken.authorization) {
                return {
                    code: 200,
                    message: "authorization success",
                };
            }
            else {
                return {
                    code: 401,
                    message: "authorization fail",
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
    async logout(request) {
        const token = this.tokenService.getBearerToken(request);
        if (!token) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            await this.tokenService.removeJwtToken(token);
            return {
                code: 200,
                message: "logout success",
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
    async forgotPassword(email) {
        if (!email) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const checkAdmin = await this.authModel.findOne({ email: email });
            const checkCode = await this.forgotModel.findOne({ email: email });
            if (!checkAdmin) {
                return {
                    code: 404,
                    message: "not found",
                };
            }
            if (checkCode) {
                await this.forgotModel.findOneAndUpdate({ _id: checkCode._id }, { code: (0, generateRandomCode_1.default)() });
            }
            else {
                await this.forgotModel.create({
                    email: email,
                    code: (0, generateRandomCode_1.default)(),
                });
            }
            return {
                code: 200,
                message: "ok",
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
    async resetPassword(data) {
        if (!data.email || !data.code || !data.newPassword) {
            return {
                status: 400,
                message: "Not enough arguments",
            };
        }
        try {
            const checkCode = await this.authModel.findOne({
                email: data.email,
                code: data.code,
            });
            if (!checkCode) {
                return {
                    code: 404,
                    message: "not found",
                };
            }
            await this.authModel.findOneAndUpdate({ email: data.email }, { password: bcrypt.hashSync(data.newPassword) });
            return {
                code: 200,
                message: "password update",
            };
        }
        catch (err) {
            console.log(err);
            return {
                code: 500,
                message: "error message",
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __param(2, (0, mongoose_1.InjectModel)(forgot_schema_1.Forgot.name)),
    __metadata("design:paramtypes", [token_service_1.TokenService, mongoose_2.default.Model, mongoose_2.default.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map