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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_ts_controllers_1 = require("koa-ts-controllers");
const address_1 = require("@/models/address");
let AddressController = class AddressController {
    add(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { addr, addrType, } = ctx.request.body;
            const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/);
            if (regex.test(addr)) {
                const new_addr = yield address_1.Address.create({
                    address: addr,
                    type: addrType,
                });
                return {
                    success: true,
                    payload: new_addr,
                };
            }
            else {
                return {
                    success: false,
                    reason: "Invalid format",
                };
            }
        });
    }
    index(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield address_1.Address.findAll();
        });
    }
};
__decorate([
    koa_ts_controllers_1.Post("/"),
    __param(0, koa_ts_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "add", null);
__decorate([
    koa_ts_controllers_1.Get("/"),
    __param(0, koa_ts_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "index", null);
AddressController = __decorate([
    koa_ts_controllers_1.Controller("/address")
], AddressController);
exports.default = AddressController;
//# sourceMappingURL=address.js.map