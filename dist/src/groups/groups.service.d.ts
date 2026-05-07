import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user: any): Prisma.PrismaPromise<({
        _count: {
            enrollments: number;
        };
        course: {
            id: string;
            name: string;
            isActive: boolean;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
            description: string | null;
            durationUnit: string;
            duration: number;
            maxStudents: number;
        };
        teacher: {
            id: string;
            name: string;
            specialty: string | null;
        } | null;
    } & {
        id: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: Prisma.Decimal | null;
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
    })[]>;
    findOne(id: string, centerId: string): Promise<{
        course: {
            id: string;
            name: string;
            isActive: boolean;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
            description: string | null;
            durationUnit: string;
            duration: number;
            maxStudents: number;
        };
        enrollments: ({
            student: {
                operator: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                phone: string;
                name: string;
                centerId: string;
                createdAt: Date;
                updatedAt: Date;
                operatorId: string;
                email: string | null;
            };
        } & {
            id: string;
            isActive: boolean;
            studentId: string;
            groupId: string;
            enrolledAt: Date;
        })[];
    } & {
        id: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: Prisma.Decimal | null;
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
    }>;
    create(dto: CreateGroupDto, user: any): Promise<{
        id: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: Prisma.Decimal | null;
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
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: Prisma.Decimal | null;
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
    }>;
    archive(id: string, user: any): Promise<{
        id: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        price: Prisma.Decimal | null;
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
    }>;
    transfer(studentId: string, fromGroupId: string, toGroupId: string, centerId: string): Promise<{
        id: string;
        isActive: boolean;
        studentId: string;
        groupId: string;
        enrolledAt: Date;
    }>;
    enroll(groupId: string, studentId: string, centerId: string): Promise<{
        id: string;
        isActive: boolean;
        studentId: string;
        groupId: string;
        enrolledAt: Date;
    }>;
}
