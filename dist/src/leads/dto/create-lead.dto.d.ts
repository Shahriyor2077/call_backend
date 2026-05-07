import { LeadStatus } from '@prisma/client';
export declare class CreateLeadDto {
    name: string;
    phone: string;
    interest?: string;
    source?: string;
    notes?: string;
    operatorId?: string;
}
export declare class UpdateLeadStatusDto {
    status: LeadStatus;
    notes?: string;
}
