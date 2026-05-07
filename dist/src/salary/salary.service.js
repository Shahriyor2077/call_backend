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
exports.SalaryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let SalaryService = class SalaryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMysalary(user) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        const payments = await this.prisma.payment.findMany({
            where: {
                operatorId: user.id,
                isRefunded: false,
                paidAt: { gte: startOfMonth, lte: endOfMonth },
            },
            include: { student: { select: { name: true } } },
        });
        const setting = await this.prisma.salarySetting.findUnique({
            where: { operatorId: user.id },
        });
        const percentage = new client_1.Prisma.Decimal(setting?.percentage ?? 10);
        const fixedAmount = new client_1.Prisma.Decimal(setting?.fixedAmount ?? 0);
        const totalAmount = payments.reduce((sum, p) => sum.plus(p.amount), new client_1.Prisma.Decimal(0));
        const salary = totalAmount.mul(percentage).div(100).plus(fixedAmount);
        return {
            month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`,
            totalPayments: totalAmount.toNumber(),
            percentage: percentage.toNumber(),
            fixedAmount: fixedAmount.toNumber(),
            salary: parseFloat(salary.toFixed(2)),
            payments,
        };
    }
    async getReport(user, month) {
        let year, monthNum;
        if (month) {
            [year, monthNum] = month.split('-').map(Number);
        }
        else {
            const now = new Date();
            year = now.getFullYear();
            monthNum = now.getMonth() + 1;
        }
        const startOfMonth = new Date(year, monthNum - 1, 1);
        const endOfMonth = new Date(year, monthNum, 0, 23, 59, 59);
        const operators = await this.prisma.user.findMany({
            where: { centerId: user.centerId, role: client_1.Role.OPERATOR },
            include: { salarySetting: true },
        });
        const report = await Promise.all(operators.map(async (op) => {
            const payments = await this.prisma.payment.findMany({
                where: {
                    operatorId: op.id,
                    isRefunded: false,
                    paidAt: { gte: startOfMonth, lte: endOfMonth },
                },
            });
            const percentage = new client_1.Prisma.Decimal(op.salarySetting?.percentage ?? 10);
            const fixedAmount = new client_1.Prisma.Decimal(op.salarySetting?.fixedAmount ?? 0);
            const totalAmount = payments.reduce((sum, p) => sum.plus(p.amount), new client_1.Prisma.Decimal(0));
            const salary = totalAmount.mul(percentage).div(100).plus(fixedAmount);
            return {
                operator: { id: op.id, name: op.name, phone: op.phone },
                totalPayments: totalAmount.toNumber(),
                paymentsCount: payments.length,
                percentage: percentage.toNumber(),
                fixedAmount: fixedAmount.toNumber(),
                salary: parseFloat(salary.toFixed(2)),
            };
        }));
        return {
            month: `${year}-${String(monthNum).padStart(2, '0')}`,
            operators: report,
            totalSalary: parseFloat(report.reduce((sum, r) => sum + r.salary, 0).toFixed(2)),
        };
    }
};
exports.SalaryService = SalaryService;
exports.SalaryService = SalaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalaryService);
//# sourceMappingURL=salary.service.js.map