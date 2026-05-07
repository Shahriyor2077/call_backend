import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    findAll(requestingUser: any, roleFilter?: string): Promise<{
        id: string;
        phone: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        centerId: string | null;
        createdAt: Date;
        center: {
            id: string;
            phone: string | null;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
        } | null;
        salarySetting: {
            id: string;
            updatedAt: Date;
            percentage: import("@prisma/client-runtime-utils").Decimal;
            fixedAmount: import("@prisma/client-runtime-utils").Decimal;
            operatorId: string;
        } | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        phone: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        centerId: string | null;
        createdAt: Date;
        center: {
            id: string;
            phone: string | null;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            address: string | null;
        } | null;
        salarySetting: {
            id: string;
            updatedAt: Date;
            percentage: import("@prisma/client-runtime-utils").Decimal;
            fixedAmount: import("@prisma/client-runtime-utils").Decimal;
            operatorId: string;
        } | null;
    }>;
    create(dto: CreateUserDto, requestingUser: any): Promise<{
        id: string;
        phone: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        centerId: string | null;
        createdAt: Date;
    }>;
    update(id: string, dto: any, requestingUser: any): Promise<{
        id: string;
        phone: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        centerId: string | null;
        updatedAt: Date;
    }>;
    remove(id: string, requestingUser: any): Promise<{
        id: string;
        deleted: boolean;
    }>;
    updateSalaryPercentage(operatorId: string, percentage: number, adminCenterId: string, fixedAmount?: number): Promise<{
        id: string;
        updatedAt: Date;
        percentage: import("@prisma/client-runtime-utils").Decimal;
        fixedAmount: import("@prisma/client-runtime-utils").Decimal;
        operatorId: string;
    }>;
}
