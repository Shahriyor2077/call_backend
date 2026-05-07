import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
export declare class TeachersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(centerId: string): import("@prisma/client").Prisma.PrismaPromise<({
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
    create(dto: CreateTeacherDto, centerId: string): Promise<{
        id: string;
        phone: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        specialty: string | null;
    }>;
    update(id: string, dto: Partial<CreateTeacherDto> & {
        isActive?: boolean;
    }, centerId: string): Promise<{
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
