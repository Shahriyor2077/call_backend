import { SalaryService } from './salary.service';
export declare class SalaryController {
    private salaryService;
    constructor(salaryService: SalaryService);
    getMySalary(user: any): Promise<{
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
            operatorId: string;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            paidAt: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            isRefunded: boolean;
            refundedAt: Date | null;
        })[];
    }>;
    getReport(user: any, month?: string): Promise<{
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
        }[];
        totalSalary: number;
    }>;
}
