import { PrismaService } from '../prisma/prisma.service';
import { CreateCenterDto } from './dto/create-center.dto';
export declare class CentersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPublic(): Promise<{
        id: string;
        name: string;
        address: string | null;
    }[]>;
    findAll(): Promise<{
        admin: {
            id: string;
            phone: string;
            name: string;
        };
        users: undefined;
        _count: {
            students: number;
            users: number;
        };
        subscription: ({
            plan: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                operatorLimit: number;
                durationDays: number;
            };
        } & {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            planId: string;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            startDate: Date;
            endDate: Date;
        }) | null;
        id: string;
        phone: string | null;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        address: string | null;
    }[]>;
    findOne(id: string): Promise<{
        _count: {
            students: number;
            users: number;
            groups: number;
        };
        subscription: ({
            plan: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                price: import("@prisma/client-runtime-utils").Decimal;
                operatorLimit: number;
                durationDays: number;
            };
        } & {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            planId: string;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            startDate: Date;
            endDate: Date;
        }) | null;
    } & {
        id: string;
        phone: string | null;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        address: string | null;
    }>;
    create(dto: CreateCenterDto): Promise<{
        id: string;
        phone: string | null;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        address: string | null;
    }>;
    update(id: string, dto: any, user?: any): Promise<{
        id: string;
        phone: string | null;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        address: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        phone: string | null;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        address: string | null;
    }>;
    getStats(): Promise<{
        total: number;
        active: number;
        withExpiredSub: number;
    }>;
}
