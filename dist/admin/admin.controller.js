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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const swagger_1 = require("@nestjs/swagger");
const update_password_dto_1 = require("./dto/update-password.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    updateEmail(req, args) {
        return this.adminService.updateEmail(req, args.newEmail);
    }
    updatePassword(req, data) {
        return this.adminService.updatePassword(req, data);
    }
    updateIdTelegram(req, args) {
        return this.adminService.updateIdTelegram(req, args.newIdTelegram);
    }
    updateTokenTelegramBot(req, args) {
        return this.adminService.updateTokenTelegramBot(req, args.newTokenTelegramBot);
    }
    updateTokenMonobank(req, data) {
        return this.adminService.updateTokenMonobank(req, data.token);
    }
    updateJarMonobank(req, data) {
        return this.adminService.updateActiveJar(req, data.jarId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, swagger_1.ApiHeaders)([{ name: "Authorization" }]),
    (0, swagger_1.ApiQuery)({ name: "newEmail" }),
    (0, common_1.Put)("email"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateEmail", null);
__decorate([
    (0, swagger_1.ApiHeaders)([{ name: "Authorization" }]),
    (0, common_1.Put)("password"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePassword", null);
__decorate([
    (0, swagger_1.ApiHeaders)([{ name: "Authorization" }]),
    (0, swagger_1.ApiQuery)({ name: "newIdTelegram" }),
    (0, common_1.Put)("id-telegram"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateIdTelegram", null);
__decorate([
    (0, swagger_1.ApiHeaders)([{ name: "Authorization" }]),
    (0, swagger_1.ApiQuery)({ name: "newTokenTelegramBot" }),
    (0, common_1.Put)("token-telegram-bot"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateTokenTelegramBot", null);
__decorate([
    (0, swagger_1.ApiHeaders)([{ name: "Authorization" }]),
    (0, common_1.Put)("token-monobank"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateTokenMonobank", null);
__decorate([
    (0, swagger_1.ApiHeaders)([{ name: "Authorization" }]),
    (0, common_1.Put)("jar-monobank"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateJarMonobank", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("api/admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map