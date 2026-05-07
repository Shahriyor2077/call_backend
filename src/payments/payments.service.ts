import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) { }

  async getStatsByPeriod(user: any, from: Date, to: Date) {
    const where: any = {
      centerId: user.centerId,
      isRefunded: false,
      paidAt: { gte: from, lte: to }
    };
    if (user.role === Role.OPERATOR) where.operatorId = user.id;

    const [sum, count] = await Promise.all([
      this.prisma.payment.aggregate({
        where,
        _sum: { amount: true },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      sum: Number(sum._sum.amount || 0),
      count,
    };
  }

  async findAll(user: any, query?: {
    page?: number;
    limit?: number;
    studentId?: string;
    operatorId?: string;
    groupId?: string;
    teacherId?: string;
    type?: string;
    method?: string;
    from?: string;
    to?: string;
  }) {
    const where: any = { centerId: user.centerId };
    if (user.role === Role.OPERATOR) where.operatorId = user.id;
    if (query?.studentId) where.studentId = query.studentId;
    if (query?.operatorId && user.role === Role.ADMIN) where.operatorId = query.operatorId;
    if (query?.type) where.type = query.type;
    if (query?.method) where.method = query.method;
    if (query?.groupId) {
      where.student = { enrollments: { some: { groupId: query.groupId, isActive: true } } };
    } else if (query?.teacherId) {
      where.student = { enrollments: { some: { group: { teacherId: query.teacherId }, isActive: true } } };
    }
    if (query?.from || query?.to) {
      where.paidAt = {};
      if (query.from) where.paidAt.gte = new Date(query.from);
      if (query.to) {
        const to = new Date(query.to);
        to.setHours(23, 59, 59, 999);
        where.paidAt.lte = to;
      }
    }

    const page = query?.page || 1;
    const limit = query?.limit || 50;
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        select: {
          id: true,
          amount: true,
          type: true,
          method: true,
          isRefunded: true,
          notes: true,
          paidAt: true,
          student: {
            select: {
              id: true,
              name: true,
              phone: true,
              enrollments: {
                where: { isActive: true },
                select: {
                  id: true,
                  isActive: true,
                  enrolledAt: true,
                  group: {
                    select: {
                      id: true,
                      name: true,
                      startDate: true,
                      endDate: true,
                      course: { select: { id: true, name: true } },
                      teacher: { select: { id: true, name: true } },
                    },
                  },
                },
              }
            }
          },
          operator: {
            select: {
              id: true,
              name: true
            }
          },
        },
        orderBy: { paidAt: 'desc' },
        take: limit,
        skip,
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      data: payments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreatePaymentDto, user: any) {
    const student = await this.prisma.student.findFirst({
      where: { id: dto.studentId, centerId: user.centerId },
    });
    if (!student) throw new NotFoundException('Talaba topilmadi');

    return this.prisma.payment.create({
      data: {
        ...dto,
        centerId: user.centerId,
        operatorId: user.id,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : new Date(),
      },
      include: {
        student: { select: { id: true, name: true } },
      },
    });
  }

  async refund(id: string, user: any) {
    if (user.role !== Role.ADMIN) throw new ForbiddenException('Faqat admin qaytara oladi');
    const payment = await this.prisma.payment.findFirst({
      where: { id, centerId: user.centerId },
    });
    if (!payment) throw new NotFoundException('To\'lov topilmadi');
    if (payment.isRefunded) throw new ForbiddenException('Allaqachon qaytarilgan');

    return this.prisma.payment.update({
      where: { id },
      data: { isRefunded: true, refundedAt: new Date() },
    });
  }

  async update(id: string, dto: any, user: any) {
    if (user.role !== Role.ADMIN) throw new ForbiddenException('Faqat admin tahrirlaydi');
    const payment = await this.prisma.payment.findFirst({
      where: { id, centerId: user.centerId },
    });
    if (!payment) throw new NotFoundException('To\'lov topilmadi');
    return this.prisma.payment.update({ where: { id }, data: dto });
  }

  async remove(id: string, user: any) {
    if (user.role !== Role.ADMIN) throw new ForbiddenException('Faqat admin o\'chira oladi');
    const payment = await this.prisma.payment.findFirst({
      where: { id, centerId: user.centerId },
    });
    if (!payment) throw new NotFoundException('To\'lov topilmadi');
    return this.prisma.payment.delete({ where: { id } });
  }
}
