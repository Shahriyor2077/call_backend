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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStatsByPeriod(user, from, to) {
        const where = {
            centerId: user.centerId,
            isRefunded: false,
            paidAt: { gte: from, lte: to }
        };
        if (user.role === client_1.Role.OPERATOR)
            where.operatorId = user.id;
        const [sum, count] = await Promise.all([
            this.prisma.payment.aggregate({
                where,
                _sum: { amount: true },
            }),
            this.prisma.payment.count({ where }),
        ]);
        return {
            sum: Number(sum._sum.amount || 0),
            count,
        };
    }
    async findAll(user, query) {
        const where = { centerId: user.centerId };
        if (user.role === client_1.Role.OPERATOR)
            where.operatorId = user.id;
        if (query?.studentId)
            where.studentId = query.studentId;
        if (query?.operatorId && user.role === client_1.Role.ADMIN)
            where.operatorId = query.operatorId;
        if (query?.type)
            where.type = query.type;
        if (query?.method)
            where.method = query.method;
        if (query?.groupId) {
            where.student = { enrollments: { some: { groupId: query.groupId, isActive: true } } };
        }
        else if (query?.teacherId) {
            where.student = { enrollments: { some: { group: { teacherId: query.teacherId }, isActive: true } } };
        }
        if (query?.from || query?.to) {
            where.paidAt = {};
            if (query.from)
                where.paidAt.gte = new Date(query.from);
            if (query.to) {
                const to = new Date(query.to);
                to.setHours(23, 59, 59, 999);
                where.paidAt.lte = to;
            }
        }
        const page = query?.page || 1;
        const limit = query?.limit || 50;
        const skip = (page - 1) * limit;
        const [payments, total] = await Promise.all([
            this.prisma.payment.findMany({
                where,
                select: {
                    id: true,
                    amount: true,
                    type: true,
                    method: true,
                    isRefunded: true,
                    notes: true,
                    paidAt: true,
                    student: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                            enrollments: {
                                where: { isActive: true },
                                select: {
                                    id: true,
                                    isActive: true,
                                    enrolledAt: true,
                                    group: {
                                        select: {
                                            id: true,
                                            name: true,
                                            startDate: true,
                                            endDate: true,
                                            course: { select: { id: true, name: true } },
                                            teacher: { select: { id: true, name: true } },
                                        },
                                    },
                                },
                            }
                        }
                    },
                    operator: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                },
                orderBy: { paidAt: 'desc' },
                take: limit,
                skip,
            }),
            this.prisma.payment.count({ where }),
        ]);
        return {
            data: payments,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, centerId) {
        const payment = await this.prisma.payment.findFirst({
            where: { id, centerId },
            include: {
                student: { select: { id: true, name: true, phone: true } },
                operator: { select: { id: true, name: true } },
                center: { select: { id: true, name: true, address: true, phone: true } },
            },
        });
        if (!payment)
            throw new common_1.NotFoundException('To\'lov topilmadi');
        return payment;
    }
    async create(dto, user) {
        const student = await this.prisma.student.findFirst({
            where: { id: dto.studentId, centerId: user.centerId },
        });
        if (!student)
            throw new common_1.NotFoundException('Talaba topilmadi');
        return this.prisma.payment.create({
            data: {
                ...dto,
                centerId: user.centerId,
                operatorId: user.id,
                paidAt: dto.paidAt ? new Date(dto.paidAt) : new Date(),
            },
            include: {
                student: { select: { id: true, name: true } },
            },
        });
    }
    async refund(id, user) {
        if (user.role !== client_1.Role.ADMIN)
            throw new common_1.ForbiddenException('Faqat admin qaytara oladi');
        const payment = await this.prisma.payment.findFirst({
            where: { id, centerId: user.centerId },
        });
        if (!payment)
            throw new common_1.NotFoundException('To\'lov topilmadi');
        if (payment.isRefunded)
            throw new common_1.ForbiddenException('Allaqachon qaytarilgan');
        return this.prisma.payment.update({
            where: { id },
            data: { isRefunded: true, refundedAt: new Date() },
        });
    }
    async update(id, dto, user) {
        if (user.role !== client_1.Role.ADMIN)
            throw new common_1.ForbiddenException('Faqat admin tahrirlaydi');
        const payment = await this.prisma.payment.findFirst({
            where: { id, centerId: user.centerId },
        });
        if (!payment)
            throw new common_1.NotFoundException('To\'lov topilmadi');
        return this.prisma.payment.update({ where: { id }, data: dto });
    }
    async remove(id, user) {
        if (user.role !== client_1.Role.ADMIN)
            throw new common_1.ForbiddenException('Faqat admin o\'chira oladi');
        const payment = await this.prisma.payment.findFirst({
            where: { id, centerId: user.centerId },
        });
        if (!payment)
            throw new common_1.NotFoundException('To\'lov topilmadi');
        return this.prisma.payment.delete({ where: { id } });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map