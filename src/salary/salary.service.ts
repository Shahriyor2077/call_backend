import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) { }

  async getMysalary(user: any) {
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

    const percentage = new Prisma.Decimal(setting?.percentage ?? 10);
    const fixedAmount = new Prisma.Decimal(setting?.fixedAmount ?? 0);
    const totalAmount = payments.reduce(
      (sum, p) => sum.plus(p.amount),
      new Prisma.Decimal(0),
    );
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

  async getReport(user: any, month?: string) {
    let year: number, monthNum: number;
    if (month) {
      [year, monthNum] = month.split('-').map(Number);
    } else {
      const now = new Date();
      year = now.getFullYear();
      monthNum = now.getMonth() + 1;
    }

    const startOfMonth = new Date(year, monthNum - 1, 1);
    const endOfMonth = new Date(year, monthNum, 0, 23, 59, 59);

    const operators = await this.prisma.user.findMany({
      where: { centerId: user.centerId, role: Role.OPERATOR },
      include: { salarySetting: true },
    });

    const report = await Promise.all(
      operators.map(async (op) => {
        const payments = await this.prisma.payment.findMany({
          where: {
            operatorId: op.id,
            isRefunded: false,
            paidAt: { gte: startOfMonth, lte: endOfMonth },
          },
        });

        const percentage = new Prisma.Decimal(op.salarySetting?.percentage ?? 10);
        const fixedAmount = new Prisma.Decimal(op.salarySetting?.fixedAmount ?? 0);
        const totalAmount = payments.reduce(
          (sum, p) => sum.plus(p.amount),
          new Prisma.Decimal(0),
        );
        const salary = totalAmount.mul(percentage).div(100).plus(fixedAmount);

        return {
          operator: { id: op.id, name: op.name, phone: op.phone },
          totalPayments: totalAmount.toNumber(),
          paymentsCount: payments.length,
          percentage: percentage.toNumber(),
          fixedAmount: fixedAmount.toNumber(),
          salary: parseFloat(salary.toFixed(2)),
        };
      }),
    );

    return {
      month: `${year}-${String(monthNum).padStart(2, '0')}`,
      operators: report,
      totalSalary: parseFloat(report.reduce((sum, r) => sum + r.salary, 0).toFixed(2)),
    };
  }
}
