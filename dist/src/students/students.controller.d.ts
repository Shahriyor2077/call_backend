import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
export declare class StudentsController {
    private studentsService;
    constructor(studentsService: StudentsService);
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<({
        operator: {
            id: string;
            name: string;
        };
        enrollments: ({
            group: {
                course: {
                    id: string;
                    centerId: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    isActive: boolean;
                    maxStudents: number;
                    price: import("@prisma/client-runtime-utils").Decimal;
                    duration: number;
                    durationUnit: string;
                    description: string | null;
                };
            } & {
                id: string;
                centerId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                courseId: string;
                type: import("@prisma/client").$Enums.GroupType;
                status: import("@prisma/client").$Enums.GroupStatus;
                maxStudents: number;
                price: import("@prisma/client-runtime-utils").Decimal | null;
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
            };
        } & {
            id: string;
            isActive: boolean;
            studentId: string;
            groupId: string;
            enrolledAt: Date;
        })[];
        payments: {
            id: string;
            centerId: string;
            operatorId: string;
            createdAt: Date;
            updatedAt: Date;
            paidAt: Date;
            studentId: string;
            type: import("@prisma/client").$Enums.PaymentType;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            isRefunded: boolean;
            refundedAt: Date | null;
            notes: string | null;
        }[];
    } & {
        id: string;
        centerId: string;
        operatorId: string;
        name: string;
        phone: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getDebtors(user: any): Promise<any[]>;
    findOne(id: string, user: any): Promise<{
        operator: {
            id: string;
            name: string;
        };
        enrollments: ({
            group: {
                course: {
                    id: string;
                    centerId: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    isActive: boolean;
                    maxStudents: number;
                    price: import("@prisma/client-runtime-utils").Decimal;
                    duration: number;
                    durationUnit: string;
                    description: string | null;
                };
            } & {
                id: string;
                centerId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                courseId: string;
                type: import("@prisma/client").$Enums.GroupType;
                status: import("@prisma/client").$Enums.GroupStatus;
                maxStudents: number;
                price: import("@prisma/client-runtime-utils").Decimal | null;
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
            };
        } & {
            id: string;
            isActive: boolean;
            studentId: string;
            groupId: string;
            enrolledAt: Date;
        })[];
        payments: {
            id: string;
            centerId: string;
            operatorId: string;
            createdAt: Date;
            updatedAt: Date;
            paidAt: Date;
            studentId: string;
            type: import("@prisma/client").$Enums.PaymentType;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            isRefunded: boolean;
            refundedAt: Date | null;
            notes: string | null;
        }[];
    } & {
        id: string;
        centerId: string;
        operatorId: string;
        name: string;
        phone: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreateStudentDto, user: any): Promise<{
        id: string;
        centerId: string;
        operatorId: string;
        name: string;
        phone: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        centerId: string;
        operatorId: string;
        name: string;
        phone: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    enroll(studentId: string, groupId: string, user: any): Promise<{
        id: string;
        isActive: boolean;
        studentId: string;
        groupId: string;
        enrolledAt: Date;
    }>;
    remove(id: string, user: any): Promise<{
        id: string;
        centerId: string;
        operatorId: string;
        name: string;
        phone: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
