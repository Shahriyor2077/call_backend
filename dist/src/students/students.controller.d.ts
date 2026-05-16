import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import type { AuthUser } from '../common/types';
export declare class StudentsController {
    private studentsService;
    constructor(studentsService: StudentsService);
    findAll(user: AuthUser): import("@prisma/client").Prisma.PrismaPromise<({
        payments: {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            operatorId: string | null;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            isRefunded: boolean;
            amount: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
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
                maxStudents: number | null;
                isArchived: boolean;
                courseId: string;
                type: import("@prisma/client").$Enums.GroupType;
                meetLink: string | null;
                platform: string | null;
                room: string | null;
                startTime: string | null;
                endTime: string | null;
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
        isDeleted: boolean;
        operatorId: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
        notes: string | null;
    })[]>;
    getDebtors(user: AuthUser): Promise<any[]>;
    findOne(id: string, user: AuthUser): Promise<{
        payments: {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            operatorId: string | null;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            isRefunded: boolean;
            amount: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
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
                maxStudents: number | null;
                isArchived: boolean;
                courseId: string;
                type: import("@prisma/client").$Enums.GroupType;
                meetLink: string | null;
                platform: string | null;
                room: string | null;
                startTime: string | null;
                endTime: string | null;
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
        isDeleted: boolean;
        operatorId: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
        notes: string | null;
    }>;
    create(dto: CreateStudentDto, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        operatorId: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
        notes: string | null;
    }>;
    update(id: string, dto: any, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        operatorId: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
        notes: string | null;
    }>;
    enroll(studentId: string, groupId: string, user: AuthUser): Promise<{
        id: string;
        isActive: boolean;
        studentId: string;
        groupId: string;
        enrolledAt: Date;
    }>;
    remove(id: string, user: AuthUser): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        operatorId: string | null;
        surname: string | null;
        parentPhone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: Date | null;
        notes: string | null;
    }>;
}
