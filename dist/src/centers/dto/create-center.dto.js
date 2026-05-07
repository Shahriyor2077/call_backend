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
exports.CreateCenterDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCenterDto {
    name;
    address;
    phone;
    adminName;
    adminPhone;
    adminPassword;
}
exports.CreateCenterDto = CreateCenterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCenterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCenterDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+998[0-9]{9}$/, { message: 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak' }),
    __metadata("design:type", String)
], CreateCenterDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCenterDto.prototype, "adminName", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\+998[0-9]{9}$/, { message: 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak' }),
    __metadata("design:type", String)
], CreateCenterDto.prototype, "adminPhone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCenterDto.prototype, "adminPassword", void 0);
//# sourceMappingURL=create-center.dto.js.map