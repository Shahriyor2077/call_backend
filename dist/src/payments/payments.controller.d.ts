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
            amount: import("@prisma/client-runtime-utils").Decimal;
            id: string;
            type: import("@prisma/client").$Enums.PaymentType;
            method: import("@prisma/client").$Enums.PaymentMethod;
            isRefunded: boolean;
            notes: string | null;
            paidAt: Date;
            student: {
                id: string;
                name: string;
                phone: string;
                enrollments: {
                    id: string;
                    isActive: boolean;
                    enrolledAt: Date;
                    group: {
                        id: string;
                        name: string;
                        startDate: Date | null;
                        endDate: Date | null;
                        course: {
                            id: string;
                            name: string;
                        };
                        teacher: {
                            id: string;
                            name: string;
                        } | null;
                    };
                }[];
            };
            operator: {
                id: string;
                name: string;
            };
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
        amount: import("@prisma/client-runtime-utils").Decimal;
        id: string;
        centerId: string;
        studentId: string;
        operatorId: string;
        type: import("@prisma/client").$Enums.PaymentType;
        method: import("@prisma/client").$Enums.PaymentMethod;
        isRefunded: boolean;
        refundedAt: Date | null;
        notes: string | null;
        paidAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        amount: import("@prisma/client-runtime-utils").Decimal;
        id: string;
        centerId: string;
        studentId: string;
        operatorId: string;
        type: import("@prisma/client").$Enums.PaymentType;
        method: import("@prisma/client").$Enums.PaymentMethod;
        isRefunded: boolean;
        refundedAt: Date | null;
        notes: string | null;
        paidAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refund(id: string, user: any): Promise<{
        amount: import("@prisma/client-runtime-utils").Decimal;
        id: string;
        centerId: string;
        studentId: string;
        operatorId: string;
        type: import("@prisma/client").$Enums.PaymentType;
        method: import("@prisma/client").$Enums.PaymentMethod;
        isRefunded: boolean;
        refundedAt: Date | null;
        notes: string | null;
        paidAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, user: any): Promise<{
        amount: import("@prisma/client-runtime-utils").Decimal;
        id: string;
        centerId: string;
        studentId: string;
        operatorId: string;
        type: import("@prisma/client").$Enums.PaymentType;
        method: import("@prisma/client").$Enums.PaymentMethod;
        isRefunded: boolean;
        refundedAt: Date | null;
        notes: string | null;
        paidAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
