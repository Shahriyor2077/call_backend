import { SalaryService } from './salary.service';
import type { AuthUser } from '../common/types';
export declare class SalaryController {
    private salaryService;
    constructor(salaryService: SalaryService);
    getMySalary(user: AuthUser): Promise<{
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
            amount: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
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
    paySalary(user: AuthUser, operatorId: string, body: {
        month: string;
        amount: number;
        bonusAmount: number;
        fixedAmount: number;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        fixedAmount: import("@prisma/client-runtime-utils").Decimal;
        operatorId: string;
        month: string;
        notes: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date;
        bonusAmount: import("@prisma/client-runtime-utils").Decimal;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        paidBy: string | null;
    }>;
    getAllPaymentHistory(month?: string): Promise<{
        id: string;
        createdAt: Date;
        fixedAmount: import("@prisma/client-runtime-utils").Decimal;
        operatorId: string;
        month: string;
        notes: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date;
        bonusAmount: import("@prisma/client-runtime-utils").Decimal;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        paidBy: string | null;
    }[]>;
    getPaymentHistory(operatorId: string): Promise<{
        id: string;
        createdAt: Date;
        fixedAmount: import("@prisma/client-runtime-utils").Decimal;
        operatorId: string;
        month: string;
        notes: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date;
        bonusAmount: import("@prisma/client-runtime-utils").Decimal;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        paidBy: string | null;
    }[]>;
}
