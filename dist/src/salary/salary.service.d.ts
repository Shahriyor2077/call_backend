import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/types';
export declare class SalaryService {
    private prisma;
    constructor(prisma: PrismaService);
    getMysalary(user: AuthUser): Promise<{
        month: string;
        totalPayments: number;
        percentage: number;
        fixedAmount: number;
        salary: number;
        payments: ({
            student: {
                name: string;
            };
        } & {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            operatorId: string | null;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            isRefunded: boolean;
            amount: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            refundedAt: Date | null;
            paidAt: Date;
        })[];
    }>;
    getReport(user: AuthUser, month?: string): Promise<{
        month: string;
        operators: {
            operator: {
                id: string;
                name: string;
                phone: string;
            };
            totalPayments: number;
            paymentsCount: number;
            percentage: number;
            fixedAmount: number;
            salary: number;
            isPaid: boolean;
            paidAt: Date | undefined;
        }[];
        totalSalary: number;
    }>;
    paySalary(user: AuthUser, operatorId: string, data: {
        month: string;
        amount: number;
        bonusAmount: number;
        fixedAmount: number;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        fixedAmount: Prisma.Decimal;
        operatorId: string;
        month: string;
        notes: string | null;
        amount: Prisma.Decimal;
        paidAt: Date;
        bonusAmount: Prisma.Decimal;
        totalAmount: Prisma.Decimal;
        paidBy: string | null;
    }>;
    getPaymentHistory(operatorId: string): Promise<{
        id: string;
        createdAt: Date;
        fixedAmount: Prisma.Decimal;
        operatorId: string;
        month: string;
        notes: string | null;
        amount: Prisma.Decimal;
        paidAt: Date;
        bonusAmount: Prisma.Decimal;
        totalAmount: Prisma.Decimal;
        paidBy: string | null;
    }[]>;
    getAllPaymentHistory(month?: string): Promise<{
        id: string;
        createdAt: Date;
        fixedAmount: Prisma.Decimal;
        operatorId: string;
        month: string;
        notes: string | null;
        amount: Prisma.Decimal;
        paidAt: Date;
        bonusAmount: Prisma.Decimal;
        totalAmount: Prisma.Decimal;
        paidBy: string | null;
    }[]>;
}
