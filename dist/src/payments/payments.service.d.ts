import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthUser } from '../common/types';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getStatsByPeriod(user: AuthUser, from: Date, to: Date): Promise<{
        sum: number;
        count: number;
    }>;
    findAll(user: AuthUser, query?: {
        page?: number;
        limit?: number;
        studentId?: string;
        operatorId?: string;
        groupId?: string;
        teacherId?: string;
        type?: string;
        method?: string;
        from?: string;
        to?: string;
    }): Promise<{
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
    findOne(id: string, centerId: string): Promise<{
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
