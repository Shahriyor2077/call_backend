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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    prisma;
    authService;
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async findAll(requestingUser, roleFilter) {
        const where = {};
        if (requestingUser.role === client_1.Role.ADMIN) {
            where.centerId = requestingUser.centerId;
            where.role = client_1.Role.OPERATOR;
        }
        if (roleFilter) {
            where.role = roleFilter;
        }
        return this.prisma.user.findMany({
            where,
            select: {
                id: true, name: true, phone: true, role: true,
                isActive: true, centerId: true, center: true,
                createdAt: true, salarySetting: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true, name: true, phone: true, role: true,
                isActive: true, centerId: true, center: true,
                createdAt: true, salarySetting: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('Foydalanuvchi topilmadi');
        return user;
    }
    async create(dto, requestingUser) {
        if (requestingUser.role === client_1.Role.ADMIN) {
            if (dto.role !== client_1.Role.OPERATOR) {
                throw new common_1.ForbiddenException('Admin faqat operator yarata oladi');
            }
            dto.centerId = requestingUser.centerId;
            const sub = await this.prisma.subscription.findUnique({
                where: { centerId: requestingUser.centerId },
                include: { plan: true },
            });
            if (sub && sub.status === 'ACTIVE') {
                const operatorCount = await this.prisma.user.count({
                    where: { centerId: requestingUser.centerId, role: client_1.Role.OPERATOR, isActive: true },
                });
                if (operatorCount >= sub.plan.operatorLimit) {
                    throw new common_1.BadRequestException(`Tarif limiti: maksimal ${sub.plan.operatorLimit} ta operator`);
                }
            }
        }
        const existing = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
        if (existing)
            throw new common_1.BadRequestException('Bu telefon raqam allaqachon mavjud');
        const hashedPassword = await this.authService.hashPassword(dto.password);
        const user = await this.prisma.user.create({
            data: { ...dto, password: hashedPassword },
            select: {
                id: true, name: true, phone: true, role: true,
                isActive: true, centerId: true, createdAt: true,
            },
        });
        if (user.role === client_1.Role.OPERATOR) {
            await this.prisma.salarySetting.create({
                data: { operatorId: user.id, percentage: 10, fixedAmount: 0, updatedAt: new Date() },
            });
        }
        return user;
    }
    async update(id, dto, requestingUser) {
        const user = await this.findOne(id);
        if (requestingUser.role === client_1.Role.ADMIN && user.centerId !== requestingUser.centerId) {
            throw new common_1.ForbiddenException();
        }
        if (dto.password) {
            dto.password = await this.authService.hashPassword(dto.password);
        }
        return this.prisma.user.update({
            where: { id },
            data: dto,
            select: {
                id: true, name: true, phone: true, role: true,
                isActive: true, centerId: true, updatedAt: true,
            },
        });
    }
    async remove(id, requestingUser) {
        const user = await this.findOne(id);
        if (requestingUser.role === client_1.Role.ADMIN) {
            if (user.centerId !== requestingUser.centerId)
                throw new common_1.ForbiddenException();
            if (user.role !== client_1.Role.OPERATOR)
                throw new common_1.ForbiddenException('Admin faqat operatorni o\'chira oladi');
        }
        await this.prisma.salarySetting.deleteMany({ where: { operatorId: id } });
        await this.prisma.user.delete({ where: { id } });
        return { id, deleted: true };
    }
    async updateSalaryPercentage(operatorId, percentage, adminCenterId, fixedAmount) {
        const operator = await this.prisma.user.findUnique({ where: { id: operatorId } });
        if (!operator || operator.centerId !== adminCenterId)
            throw new common_1.ForbiddenException();
        if (percentage < 1 || percentage > 50) {
            throw new common_1.BadRequestException('Foiz 1% dan 50% gacha bo\'lishi kerak');
        }
        const data = { percentage, updatedAt: new Date() };
        if (fixedAmount !== undefined) {
            data.fixedAmount = fixedAmount;
        }
        return this.prisma.salarySetting.upsert({
            where: { operatorId },
            update: data,
            create: { operatorId, percentage, fixedAmount: fixedAmount ?? 0, updatedAt: new Date() },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map