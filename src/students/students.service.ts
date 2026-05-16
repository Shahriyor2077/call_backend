import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { GroupsService } from '../groups/groups.service';
import { AuthUser } from '../common/types';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private groupsService: GroupsService,
  ) { }

  async getDebtors(user: AuthUser) {
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

    const debtors: any[] = [];

    for (const student of students) {
      let totalExpected = 0;
      const enrollmentDetails: any[] = [];

      for (const enrollment of student.enrollments) {
        const group = enrollment.group as any;
        const monthlyPrice = Number(group.price ?? group.course.price);
        if (!monthlyPrice) continue;

        const effectiveStart = new Date(
          Math.max(
            enrollment.enrolledAt.getTime(),
            group.startDate ? group.startDate.getTime() : enrollment.enrolledAt.getTime(),
          ),
        );

        const months = Math.max(
          0,
          (now.getFullYear() - effectiveStart.getFullYear()) * 12 +
            (now.getMonth() - effectiveStart.getMonth()) +
            1,
        );

        const expected = months * monthlyPrice;
        totalExpected += expected;
        enrollmentDetails.push({ group, monthlyPrice, months, expected, enrolledAt: enrollment.enrolledAt });
      }

      const totalPaid = student.payments.reduce(
        (s, p) => s + Number(p.amount) + Number(p.discountAmount || 0),
        0,
      );
      const debt = totalExpected - totalPaid;

      if (debt > 0) {
        debtors.push({ ...student, totalExpected, totalPaid, debt, enrollmentDetails });
      }
    }

    return debtors.sort((a, b) => b.debt - a.debt);
  }

  findAll(user: AuthUser) {
    const where: any = { centerId: user.centerId, isDeleted: false };
    if (user.role === Role.OPERATOR) where.operatorId = user.id;
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

  async findOne(id: string, user: AuthUser) {
    const where: any = { id, centerId: user.centerId, isDeleted: false };
    if (user.role === Role.OPERATOR) where.operatorId = user.id;
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
    if (!student) throw new NotFoundException('Talaba topilmadi');
    return student;
  }

  async create(dto: CreateStudentDto, user: AuthUser) {
    const { groupId, ...studentData } = dto;

    const data: any = { ...studentData, centerId: user.centerId, operatorId: user.id };
    if (data.birthDate) data.birthDate = new Date(data.birthDate);
    else delete data.birthDate;

    const student = await this.prisma.student.create({ data });

    if (groupId) {
      await this.groupsService.enroll(groupId, student.id, user.centerId);
    }

    return student;
  }

  async update(id: string, dto: any, user: AuthUser) {
    await this.findOne(id, user);
    const data: any = { ...dto };
    if (data.birthDate) data.birthDate = new Date(data.birthDate);
    else delete data.birthDate;
    return this.prisma.student.update({ where: { id }, data });
  }

  async enrollStudent(studentId: string, groupId: string, user: AuthUser) {
    return this.groupsService.enroll(groupId, studentId, user.centerId);
  }

  async remove(id: string, user: AuthUser) {
    const student = await this.findOne(id, user);
    return this.prisma.$transaction(async (tx) => {
      await tx.enrollment.deleteMany({ where: { studentId: student.id } });
      return tx.student.update({ where: { id: student.id }, data: { isDeleted: true } });
    });
  }
}
