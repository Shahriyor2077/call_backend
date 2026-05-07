import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
export declare class PlansController {
    private plansService;
    constructor(plansService: PlansService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        operatorLimit: number;
        durationDays: number;
    }[]>;
    create(dto: CreatePlanDto): import("@prisma/client").Prisma.Prisma__PlanClient<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        operatorLimit: number;
        durationDays: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: any): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        operatorLimit: number;
        durationDays: number;
    }>;
}
