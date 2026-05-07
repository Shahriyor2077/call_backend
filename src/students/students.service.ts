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
