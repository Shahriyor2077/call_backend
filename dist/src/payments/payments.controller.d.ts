import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import type { AuthUser } from '../common/types';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    getStats(user: AuthUser): Promise<{
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
    findAll(user: AuthUser, query: any): Promise<{
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
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
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
    findOne(id: string, user: AuthUser): Promise<{
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
    }>;
    create(dto: CreatePaymentDto, user: AuthUser): Promise<{
        student: {
            id: string;
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
    }>;
    update(id: string, dto: any, user: AuthUser): Promise<{
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
    }>;
    refund(id: string, user: AuthUser): Promise<{
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
    }>;
    remove(id: string, user: AuthUser): Promise<{
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
    }>;
}
