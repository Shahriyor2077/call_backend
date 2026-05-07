import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
export declare class TeachersController {
    private teachersService;
    constructor(teachersService: TeachersService);
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<({
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
    create(dto: CreateTeacherDto, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        specialty: string | null;
    }>;
    update(id: string, dto: any, user: any): Promise<{
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
