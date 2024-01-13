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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const token_blacklist_schema_1 = require("./schemas/token-blacklist.schema");
let TokenService = class TokenService {
    constructor(tokenBlacklistModel) {
        this.tokenBlacklistModel = tokenBlacklistModel;
    }
    async generateJwtToken(email) {
        const payload = { email };
        return this.jwtService.sign(payload, {
            secret: this.secret,
            expiresIn: this.timeToken,
        });
    }
    async validateJwtToken(token) {
        if (!token)
            return false;
        try {
            const checkTokenBlacklist = await this.tokenBlacklistModel.findOne({
                token: token,
            });
            if (checkTokenBlacklist)
                return false;
            const data = this.jwtService.verify(token, {
                secret: this.secret,
                ignoreExpiration: false,
            });
            if (data && data.exp && data.exp * 1000 > Date.now()) {
                return true;
            }
            else {
                await this.tokenBlacklistModel.create({ token: token });
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }
    async removeJwtToken(token) {
        await this.tokenBlacklistModel.create({ token: token });
    }
    getBearerToken(request) {
        const authorizationHeader = request.headers["authorization"];
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }
        return authorizationHeader.split(" ")[1];
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(token_blacklist_schema_1.TokenBlacklist.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], TokenService);
//# sourceMappingURL=token.service.js.map