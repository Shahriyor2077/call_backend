import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/types';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) { }

  async getMysalary(user: AuthUser) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const payments = await this.prisma.payment.findMany({
      where: {
        operatorId: user.id,
        isRefunded: false,
        isDeleted: false,
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

  async getReport(user: AuthUser, month?: string) {
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

    const monthStr = `${year}-${String(monthNum).padStart(2, '0')}`;

    const report = await Promise.all(
      operators.map(async (op) => {
        const payments = await this.prisma.payment.findMany({
          where: {
            operatorId: op.id,
            isRefunded: false,
            isDeleted: false,
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

        // Check if already paid
        const paid = await this.prisma.salaryPayment.findFirst({
          where: { operatorId: op.id, month: monthStr },
        });

        return {
          operator: { id: op.id, name: op.name, phone: op.phone },
          totalPayments: totalAmount.toNumber(),
          paymentsCount: payments.length,
          percentage: percentage.toNumber(),
          fixedAmount: fixedAmount.toNumber(),
          salary: parseFloat(salary.toFixed(2)),
          isPaid: !!paid,
          paidAt: paid?.paidAt,
        };
      }),
    );

    return {
      month: monthStr,
      operators: report,
      totalSalary: parseFloat(report.reduce((sum, r) => sum + r.salary, 0).toFixed(2)),
    };
  }

  async paySalary(
    user: AuthUser,
    operatorId: string,
    data: { month: string; amount: number; bonusAmount: number; fixedAmount: number; notes?: string },
  ) {
    const totalAmount = data.amount + data.bonusAmount + data.fixedAmount;

    const payment = await this.prisma.salaryPayment.create({
      data: {
        operatorId,
        month: data.month,
        amount: data.amount,
        bonusAmount: data.bonusAmount,
        fixedAmount: data.fixedAmount,
        totalAmount,
        notes: data.notes,
        paidBy: user.name,
      },
    });

    return payment;
  }

  async getPaymentHistory(operatorId: string) {
    const payments = await this.prisma.salaryPayment.findMany({
      where: { operatorId },
      orderBy: { paidAt: 'desc' },
    });

    return payments;
  }

  async getAllPaymentHistory(month?: string) {
    const where: any = {};
    if (month) {
      where.month = month;
    }

    const payments = await this.prisma.salaryPayment.findMany({
      where,
      orderBy: { paidAt: 'desc' },
    });

    return payments;
  }
}
