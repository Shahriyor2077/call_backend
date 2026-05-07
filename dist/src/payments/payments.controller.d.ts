import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    getStats(user: any): Promise<{
        today: {
            sum: number;
            count: number;
        };
        week: {
            sum: number;
            count: number;
        };
        month: {
            sum: number;
            count: number;
        };
    }>;
    findAll(user: any, query: any): Promise<{
        data: {
            id: string;
            student: {
                id: string;
                phone: string;
                name: string;
                enrollments: {
                    id: string;
                    isActive: boolean;
                    group: {
                        id: string;
                        name: string;
                        course: {
                            id: string;
                            name: string;
                        };
                    };
                }[];
            };
            operator: {
                id: string;
                name: string;
            };
            type: import("@prisma/client").$Enums.PaymentType;
            notes: string | null;
            paidAt: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            isRefunded: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(dto: CreatePaymentDto, user: any): Promise<{
        student: {
            id: string;
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
    }>;
    update(id: string, dto: any, user: any): Promise<{
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
    }>;
    refund(id: string, user: any): Promise<{
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
    }>;
    remove(id: string, user: any): Promise<{
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
    }>;
}
