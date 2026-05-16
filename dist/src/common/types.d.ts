import { Role } from '@prisma/client';
export interface AuthUser {
    id: string;
    name: string;
    phone: string;
    password: string;
    role: Role;
    centerId: string;
    isActive: boolean;
    center?: {
        id: string;
        name: string;
        subscription?: {
            status: string;
            endDate: Date;
        } | null;
    } | null;
    createdAt: Date;
    updatedAt: Date;
}
