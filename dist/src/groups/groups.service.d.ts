import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user: any): Prisma.PrismaPromise<({
        course: {
            id: string;
            centerId: string;
            name: string;
            maxStudents: number;
            price: Prisma.Decimal;
            duration: number;
            durationUnit: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string | null;
        };
        teacher: {
            id: string;
            name: string;
            specialty: string | null;
        } | null;
        _count: {
            enrollments: number;
        };
    } & {
        id: string;
        centerId: string;
        courseId: string;
        name: string;
        type: import("@prisma/client").$Enums.GroupType;
        status: import("@prisma/client").$Enums.GroupStatus;
        maxStudents: number;
        price: Prisma.Decimal | null;
        meetLink: string | null;
        platform: string | null;
        room: string | null;
        address: string | null;
        days: string[];
        startTime: string;
        endTime: string;
        startDate: Date | null;
        endDate: Date | null;
        duration: number | null;
        durationUnit: string | null;
        teacherId: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string, centerId: string): Promise<{
        course: {
            id: string;
            centerId: string;
            name: string;
            maxStudents: number;
            price: Prisma.Decimal;
            duration: number;
            durationUnit: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string | null;
        };
        enrollments: ({
            student: {
                operator: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                centerId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string;
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
        centerId: string;
        courseId: string;
        name: string;
        type: import("@prisma/client").$Enums.GroupType;
        status: import("@prisma/client").$Enums.GroupStatus;
        maxStudents: number;
        price: Prisma.Decimal | null;
        meetLink: string | null;
        platform: string | null;
        room: string | null;
        address: string | null;
        days: string[];
        startTime: string;
        endTime: string;
        startDate: Date | null;
        endDate: Date | null;
        duration: number | null;
        durationUnit: string | null;
        teacherId: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreateGroupDto, user: any): Promise<{
        id: string;
        centerId: string;
        courseId: string;
        name: string;
        type: import("@prisma/client").$Enums.GroupType;
        status: import("@prisma/client").$Enums.GroupStatus;
        maxStudents: number;
        price: Prisma.Decimal | null;
        meetLink: string | null;
        platform: string | null;
        room: string | null;
        address: string | null;
        days: string[];
        startTime: string;
        endTime: string;
        startDate: Date | null;
        endDate: Date | null;
        duration: number | null;
        durationUnit: string | null;
        teacherId: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        centerId: string;
        courseId: string;
        name: string;
        type: import("@prisma/client").$Enums.GroupType;
        status: import("@prisma/client").$Enums.GroupStatus;
        maxStudents: number;
        price: Prisma.Decimal | null;
        meetLink: string | null;
        platform: string | null;
        room: string | null;
        address: string | null;
        days: string[];
        startTime: string;
        endTime: string;
        startDate: Date | null;
        endDate: Date | null;
        duration: number | null;
        durationUnit: string | null;
        teacherId: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    archive(id: string, user: any): Promise<{
        id: string;
        centerId: string;
        courseId: string;
        name: string;
        type: import("@prisma/client").$Enums.GroupType;
        status: import("@prisma/client").$Enums.GroupStatus;
        maxStudents: number;
        price: Prisma.Decimal | null;
        meetLink: string | null;
        platform: string | null;
        room: string | null;
        address: string | null;
        days: string[];
        startTime: string;
        endTime: string;
        startDate: Date | null;
        endDate: Date | null;
        duration: number | null;
        durationUnit: string | null;
        teacherId: string | null;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    transfer(studentId: string, fromGroupId: string, toGroupId: string, centerId: string): Promise<{
        id: string;
        isActive: boolean;
        studentId: string;
        groupId: string;
        enrolledAt: Date;
    }>;
    unenroll(groupId: string, studentId: string, centerId: string): Promise<Prisma.BatchPayload>;
    enroll(groupId: string, studentId: string, centerId: string): Promise<{
        id: string;
        isActive: boolean;
        studentId: string;
        groupId: string;
        enrolledAt: Date;
    }>;
}
