"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const groups_service_1 = require("../groups/groups.service");
let StudentsService = class StudentsService {
    prisma;
    groupsService;
    constructor(prisma, groupsService) {
        this.prisma = prisma;
        this.groupsService = groupsService;
    }
    async getDebtors(user) {
        const now = new Date();
        const students = await this.prisma.student.findMany({
            where: {
                centerId: user.centerId,
                isDeleted: false,
                enrollments: { some: { isActive: true } },
            },
            include: {
                enrollments: {
                    where: { isActive: true },
                    include: {
                        group: { include: { course: true, teacher: { select: { id: true, name: true } } } },
                    },
                },
                payments: {
                    where: { isRefunded: false },
                },
            },
        });
        const debtors = [];
        for (const student of students) {
            let totalExpected = 0;
            const enrollmentDetails = [];
            for (const enrollment of student.enrollments) {
                const group = enrollment.group;
                const monthlyPrice = Number(group.price ?? group.course.price);
                if (!monthlyPrice)
                    continue;
                const effectiveStart = new Date(Math.max(enrollment.enrolledAt.getTime(), group.startDate ? group.startDate.getTime() : enrollment.enrolledAt.getTime()));
                const months = Math.max(0, (now.getFullYear() - effectiveStart.getFullYear()) * 12 +
                    (now.getMonth() - effectiveStart.getMonth()) +
                    1);
                const expected = months * monthlyPrice;
                totalExpected += expected;
                enrollmentDetails.push({ group, monthlyPrice, months, expected, enrolledAt: enrollment.enrolledAt });
            }
            const totalPaid = student.payments.reduce((s, p) => s + Number(p.amount) + Number(p.discountAmount || 0), 0);
            const debt = totalExpected - totalPaid;
            if (debt > 0) {
                debtors.push({ ...student, totalExpected, totalPaid, debt, enrollmentDetails });
            }
        }
        return debtors.sort((a, b) => b.debt - a.debt);
    }
    findAll(user) {
        const where = { centerId: user.centerId, isDeleted: false };
        if (user.role === client_1.Role.OPERATOR)
            where.operatorId = user.id;
        return this.prisma.student.findMany({
            where,
            include: {
                operator: { select: { id: true, name: true } },
                enrollments: {
                    include: { group: { include: { course: true } } },
                },
                payments: { orderBy: { paidAt: 'desc' }, take: 5 },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, user) {
        const where = { id, centerId: user.centerId, isDeleted: false };
        if (user.role === client_1.Role.OPERATOR)
            where.operatorId = user.id;
        const student = await this.prisma.student.findFirst({
            where,
            include: {
                operator: { select: { id: true, name: true } },
                enrollments: {
                    include: { group: { include: { course: true } } },
                },
                payments: { orderBy: { paidAt: 'desc' } },
            },
        });
        if (!student)
            throw new common_1.NotFoundException('Talaba topilmadi');
        return student;
    }
    async create(dto, user) {
        const { groupId, ...studentData } = dto;
        const data = { ...studentData, centerId: user.centerId, operatorId: user.id };
        if (data.birthDate)
            data.birthDate = new Date(data.birthDate);
        else
            delete data.birthDate;
        const student = await this.prisma.student.create({ data });
        if (groupId) {
            await this.groupsService.enroll(groupId, student.id, user.centerId);
        }
        return student;
    }
    async update(id, dto, user) {
        await this.findOne(id, user);
        const data = { ...dto };
        if (data.birthDate)
            data.birthDate = new Date(data.birthDate);
        else
            delete data.birthDate;
        return this.prisma.student.update({ where: { id }, data });
    }
    async enrollStudent(studentId, groupId, user) {
        return this.groupsService.enroll(groupId, studentId, user.centerId);
    }
    async remove(id, user) {
        const student = await this.findOne(id, user);
        return this.prisma.$transaction(async (tx) => {
            await tx.enrollment.deleteMany({ where: { studentId: student.id } });
            return tx.student.update({ where: { id: student.id }, data: { isDeleted: true } });
        });
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        groups_service_1.GroupsService])
], StudentsService);
//# sourceMappingURL=students.service.js.map