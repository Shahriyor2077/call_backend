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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.subscription.findMany({
            include: { center: true, plan: true },
            orderBy: { endDate: 'asc' },
        });
    }
    async findByCenterId(centerId) {
        return this.prisma.subscription.findUnique({
            where: { centerId },
            include: { plan: true },
        });
    }
    async assignPlan(centerId, planId, demoOverride) {
        const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
        if (!plan)
            throw new common_1.NotFoundException('Tarif topilmadi');
        const days = demoOverride ?? plan.durationDays;
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);
        return this.prisma.subscription.upsert({
            where: { centerId },
            update: { planId, startDate, endDate, status: client_1.SubscriptionStatus.ACTIVE },
            create: { centerId, planId, startDate, endDate, status: client_1.SubscriptionStatus.ACTIVE },
        });
    }
    async giveDemo(centerId, days = 14) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);
        const existing = await this.prisma.subscription.findUnique({ where: { centerId } });
        const freePlan = await this.prisma.plan.findFirst({ where: { isActive: true }, orderBy: { price: 'asc' } });
        if (!freePlan)
            throw new common_1.NotFoundException('Hech bir tarif mavjud emas');
        return this.prisma.subscription.upsert({
            where: { centerId },
            update: { startDate, endDate, status: client_1.SubscriptionStatus.DEMO },
            create: {
                centerId,
                planId: freePlan.id,
                startDate,
                endDate,
                status: client_1.SubscriptionStatus.DEMO,
            },
        });
    }
    async extend(id, days) {
        const sub = await this.prisma.subscription.findUnique({ where: { id } });
        if (!sub)
            throw new common_1.NotFoundException('Obuna topilmadi');
        const newEndDate = new Date(sub.endDate);
        newEndDate.setDate(newEndDate.getDate() + days);
        return this.prisma.subscription.update({
            where: { id },
            data: { endDate: newEndDate, status: client_1.SubscriptionStatus.ACTIVE },
        });
    }
    async checkAndUpdateExpired() {
        const now = new Date();
        await this.prisma.subscription.updateMany({
            where: { endDate: { lt: now }, status: client_1.SubscriptionStatus.ACTIVE },
            data: { status: client_1.SubscriptionStatus.EXPIRED },
        });
    }
    isAccessible(sub) {
        if (!sub)
            return false;
        return sub.status === client_1.SubscriptionStatus.ACTIVE || sub.status === client_1.SubscriptionStatus.DEMO;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map