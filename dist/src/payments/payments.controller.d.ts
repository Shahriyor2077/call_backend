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
                        teacher: {
                            id: string;
                            name: string;
                        } | null;
                        startDate: Date | null;
                        endDate: Date | null;
                    };
                    enrolledAt: Date;
                }[];
            };
            operator: {
                id: string;
                name: string;
            } | null;
            type: import("@prisma/client").$Enums.PaymentType;
            notes: string | null;
            isRefunded: boolean;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            paidAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, user: any): Promise<{
        center: {
            id: string;
            phone: string | null;
            name: string;
            address: string | null;
        };
        student: {
            id: string;
            phone: string;
            name: string;
        };
        operator: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        type: import("@prisma/client").$Enums.PaymentType;
        studentId: string;
        notes: string | null;
        isRefunded: boolean;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import("@prisma/client").$Enums.PaymentMethod;
        refundedAt: Date | null;
        paidAt: Date;
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
        operatorId: string | null;
        type: import("@prisma/client").$Enums.PaymentType;
        studentId: string;
        notes: string | null;
        isRefunded: boolean;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import("@prisma/client").$Enums.PaymentMethod;
        refundedAt: Date | null;
        paidAt: Date;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        type: import("@prisma/client").$Enums.PaymentType;
        studentId: string;
        notes: string | null;
        isRefunded: boolean;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import("@prisma/client").$Enums.PaymentMethod;
        refundedAt: Date | null;
        paidAt: Date;
    }>;
    refund(id: string, user: any): Promise<{
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        type: import("@prisma/client").$Enums.PaymentType;
        studentId: string;
        notes: string | null;
        isRefunded: boolean;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import("@prisma/client").$Enums.PaymentMethod;
        refundedAt: Date | null;
        paidAt: Date;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        type: import("@prisma/client").$Enums.PaymentType;
        studentId: string;
        notes: string | null;
        isRefunded: boolean;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import("@prisma/client").$Enums.PaymentMethod;
        refundedAt: Date | null;
        paidAt: Date;
    }>;
}
