import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import type { AuthUser } from '../common/types';
export declare class TeachersController {
    private teachersService;
    constructor(teachersService: TeachersService);
    findAll(user: AuthUser): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            groups: number;
        };
    } & {
        id: string;
        phone: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        specialty: string | null;
    })[]>;
    create(dto: CreateTeacherDto, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        specialty: string | null;
    }>;
    update(id: string, dto: any, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        specialty: string | null;
    }>;
    remove(id: string, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        specialty: string | null;
    }>;
}
