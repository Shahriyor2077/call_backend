import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { GroupsService } from '../groups/groups.service';
export declare class StudentsService {
    private prisma;
    private groupsService;
    constructor(prisma: PrismaService, groupsService: GroupsService);
    getDebtors(user: any): Promise<any[]>;
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<({
        payments: {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            operatorId: string | null;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            isRefunded: boolean;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            refundedAt: Date | null;
            paidAt: Date;
        }[];
        operator: {
            id: string;
            name: string;
        } | null;
        enrollments: ({
            group: {
                course: {
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
                };
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
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        notes: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
    })[]>;
    findOne(id: string, user: any): Promise<{
        payments: {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            operatorId: string | null;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            isRefunded: boolean;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            refundedAt: Date | null;
            paidAt: Date;
        }[];
        operator: {
            id: string;
            name: string;
        } | null;
        enrollments: ({
            group: {
                course: {
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
                };
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
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        notes: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
    }>;
    create(dto: CreateStudentDto, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        notes: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        notes: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
    }>;
    enrollStudent(studentId: string, groupId: string, user: any): Promise<{
        id: string;
        isActive: boolean;
        studentId: string;
        groupId: string;
        enrolledAt: Date;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string | null;
        notes: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
    }>;
}
