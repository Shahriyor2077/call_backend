import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto';
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user: any, query?: {
        page?: number;
        limit?: number;
        status?: string;
    }): Promise<{
        data: ({
            operator: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            phone: string;
            name: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.LeadStatus;
            operatorId: string | null;
            interest: string | null;
            source: string | null;
            notes: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            statusCounts: {
                NEW: number;
                IN_PROGRESS: number;
                ENROLLED: number;
                NOT_COME: number;
                REJECTED: number;
            };
        };
    }>;
    findOne(id: string, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        interest: string | null;
        source: string | null;
        notes: string | null;
    }>;
    create(dto: CreateLeadDto, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        interest: string | null;
        source: string | null;
        notes: string | null;
    }>;
    updateStatus(id: string, dto: UpdateLeadStatusDto, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        interest: string | null;
        source: string | null;
        notes: string | null;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        interest: string | null;
        source: string | null;
        notes: string | null;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        interest: string | null;
        source: string | null;
        notes: string | null;
    }>;
}
