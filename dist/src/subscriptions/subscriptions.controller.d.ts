import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
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
    assignPlan(body: {
        centerId: string;
        planId: string;
    }): Promise<{
        id: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        planId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        startDate: Date;
        endDate: Date;
    }>;
    giveDemo(body: {
        centerId: string;
        days?: number;
    }): Promise<{
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
}
