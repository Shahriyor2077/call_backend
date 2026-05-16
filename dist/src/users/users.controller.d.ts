import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { AuthUser } from '../common/types';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(user: AuthUser, role?: string): Promise<{
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
    create(dto: CreateUserDto, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        centerId: string | null;
        createdAt: Date;
    }>;
    update(id: string, dto: any, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        centerId: string | null;
        updatedAt: Date;
    }>;
    remove(id: string, user: AuthUser): Promise<{
        id: string;
        deleted: boolean;
    }>;
    updateSalaryPercentage(id: string, body: {
        percentage: number;
        fixedAmount?: number;
    }, user: AuthUser): Promise<{
        id: string;
        updatedAt: Date;
        percentage: import("@prisma/client-runtime-utils").Decimal;
        fixedAmount: import("@prisma/client-runtime-utils").Decimal;
        operatorId: string;
    }>;
}
