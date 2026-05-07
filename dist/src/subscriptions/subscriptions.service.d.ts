import { PrismaService } from '../prisma/prisma.service';
export declare class SubscriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        center: {
            id: string;
            phone: string | null;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
        };
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
    })[]>;
    findByCenterId(centerId: string): Promise<({
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
    }) | null>;
    assignPlan(centerId: string, planId: string, demoOverride?: number): Promise<{
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        planId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
    }>;
    giveDemo(centerId: string, days?: number): Promise<{
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        planId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
    }>;
    extend(id: string, days: number): Promise<{
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        planId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
    }>;
    checkAndUpdateExpired(): Promise<void>;
    isAccessible(sub: any): boolean;
}
