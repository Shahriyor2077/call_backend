import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            groups: number;
        };
        groups: ({
            _count: {
                enrollments: number;
            };
            teacher: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            name: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal | null;
            address: string | null;
            status: import("@prisma/client").$Enums.GroupStatus;
            startDate: Date | null;
            endDate: Date | null;
            days: string[];
            durationUnit: string | null;
            duration: number | null;
            maxStudents: number;
            isArchived: boolean;
            courseId: string;
            type: import("@prisma/client").$Enums.GroupType;
            meetLink: string | null;
            platform: string | null;
            room: string | null;
            startTime: string;
            endTime: string;
            teacherId: string | null;
        })[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        durationUnit: string;
        duration: number;
        maxStudents: number;
    })[]>;
    findOne(id: string, centerId: string): Promise<{
        groups: {
            id: string;
            name: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal | null;
            address: string | null;
            status: import("@prisma/client").$Enums.GroupStatus;
            startDate: Date | null;
            endDate: Date | null;
            days: string[];
            durationUnit: string | null;
            duration: number | null;
            maxStudents: number;
            isArchived: boolean;
            courseId: string;
            type: import("@prisma/client").$Enums.GroupType;
            meetLink: string | null;
            platform: string | null;
            room: string | null;
            startTime: string;
            endTime: string;
            teacherId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        durationUnit: string;
        duration: number;
        maxStudents: number;
    }>;
    create(dto: CreateCourseDto, user: any): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        durationUnit: string;
        duration: number;
        maxStudents: number;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        durationUnit: string;
        duration: number;
        maxStudents: number;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: import("@prisma/client-runtime-utils").Decimal;
        description: string | null;
        durationUnit: string;
        duration: number;
        maxStudents: number;
    }>;
}
