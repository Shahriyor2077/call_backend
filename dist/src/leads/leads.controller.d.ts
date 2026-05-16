import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto';
import type { AuthUser } from '../common/types';
export declare class LeadsController {
    private leadsService;
    constructor(leadsService: LeadsService);
    findAll(user: AuthUser, page?: string, limit?: string, status?: string): Promise<{
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
            notes: string | null;
            interest: string | null;
            source: string | null;
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
    findOne(id: string, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        notes: string | null;
        interest: string | null;
        source: string | null;
    }>;
    create(dto: CreateLeadDto, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        notes: string | null;
        interest: string | null;
        source: string | null;
    }>;
    update(id: string, dto: any, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        notes: string | null;
        interest: string | null;
        source: string | null;
    }>;
    updateStatus(id: string, dto: UpdateLeadStatusDto, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        notes: string | null;
        interest: string | null;
        source: string | null;
    }>;
    remove(id: string, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.LeadStatus;
        operatorId: string | null;
        notes: string | null;
        interest: string | null;
        source: string | null;
    }>;
}
