import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
export declare class StudentsController {
    private studentsService;
    constructor(studentsService: StudentsService);
    findAll(user: any): import("@prisma/client").Prisma.PrismaPromise<({
        payments: {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            operatorId: string;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            paidAt: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            isRefunded: boolean;
            refundedAt: Date | null;
        }[];
        operator: {
            id: string;
            name: string;
        };
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
        operatorId: string;
        email: string | null;
    })[]>;
    findOne(id: string, user: any): Promise<{
        payments: {
            id: string;
            centerId: string;
            createdAt: Date;
            updatedAt: Date;
            operatorId: string;
            type: import("@prisma/client").$Enums.PaymentType;
            studentId: string;
            notes: string | null;
            paidAt: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            isRefunded: boolean;
            refundedAt: Date | null;
        }[];
        operator: {
            id: string;
            name: string;
        };
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
        operatorId: string;
        email: string | null;
    }>;
    create(dto: CreateStudentDto, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string;
        email: string | null;
    }>;
    update(id: string, dto: any, user: any): Promise<{
        id: string;
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string;
        email: string | null;
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
        phone: string;
        name: string;
        centerId: string;
        createdAt: Date;
        updatedAt: Date;
        operatorId: string;
        email: string | null;
    }>;
}
