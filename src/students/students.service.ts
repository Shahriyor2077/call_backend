import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private groupsService: GroupsService,
  ) { }

  async getDebtors(user: any) {
    const now = new Date();

    const students = await this.prisma.student.findMany({
      where: {
        centerId: user.centerId,
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

      const totalPaid = student.payments.reduce((s, p) => s + Number(p.amount), 0);
      const debt = totalExpected - totalPaid;

      if (debt > 0) {
        debtors.push({ ...student, totalExpected, totalPaid, debt, enrollmentDetails });
      }
    }

    return debtors.sort((a, b) => b.debt - a.debt);
  }

  findAll(user: any) {
    const where: any = { centerId: user.centerId };
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

  async findOne(id: string, user: any) {
    const where: any = { id, centerId: user.centerId };
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

  async create(dto: CreateStudentDto, user: any) {
    const { groupId, ...studentData } = dto;

    const student = await this.prisma.student.create({
      data: { ...studentData, centerId: user.centerId, operatorId: user.id },
    });

    if (groupId) {
      await this.groupsService.enroll(groupId, student.id, user.centerId);
    }

    return student;
  }

  async update(id: string, dto: any, user: any) {
    await this.findOne(id, user);
    return this.prisma.student.update({ where: { id }, data: dto });
  }

  async enrollStudent(studentId: string, groupId: string, user: any) {
    return this.groupsService.enroll(groupId, studentId, user.centerId);
  }

  async remove(id: string, user: any) {
    const student = await this.findOne(id, user);
    return this.prisma.student.delete({ where: { id: student.id } });
  }
}
