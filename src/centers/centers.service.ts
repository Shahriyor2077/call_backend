import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCenterDto } from './dto/create-center.dto';
import * as bcrypt from 'bcryptjs';
import { Prisma, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class CentersService {
  constructor(private prisma: PrismaService) { }

  private async expireOutdatedSubscriptions() {
    await this.prisma.subscription.updateMany({
      where: {
        endDate: { lt: new Date() },
        status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.DEMO] },
      },
      data: { status: SubscriptionStatus.EXPIRED },
    });
  }

  async findAllPublic() {
    return this.prisma.center.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        address: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findAll() {
    await this.expireOutdatedSubscriptions();
    const centers = await this.prisma.center.findMany({
      include: {
        subscription: { include: { plan: true } },
        _count: { select: { users: true, students: { where: { isDeleted: false } } } },
        users: {
          where: { role: 'ADMIN' },
          select: { id: true, name: true, phone: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return centers.map(c => ({
      ...c,
      admin: c.users[0] ?? null,
      users: undefined,
    }));
  }

  async findOne(id: string) {
    const center = await this.prisma.center.findUnique({
      where: { id },
      include: {
        subscription: { include: { plan: true } },
        _count: { select: { users: true, students: { where: { isDeleted: false } }, groups: true } },
      },
    });
    if (!center) throw new NotFoundException('Markaz topilmadi');
    return center;
  }

  async create(dto: CreateCenterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { phone: dto.adminPhone },
    });
    if (existing) {
      throw new BadRequestException('Bu telefon raqam allaqachon mavjud');
    }

    const hashedPassword = await bcrypt.hash(dto.adminPassword, 12);

    return this.prisma.$transaction(async (tx) => {
      const center = await tx.center.create({
        data: {
          name: dto.name,
          address: dto.address,
          phone: dto.phone,
        },
      });

      await tx.user.create({
        data: {
          name: dto.adminName,
          phone: dto.adminPhone,
          password: hashedPassword,
          role: 'ADMIN',
          centerId: center.id,
        },
      });

      return center;
    });
  }

  async update(id: string, dto: any, user?: any) {
    await this.findOne(id);
    if (user?.role === 'ADMIN') {
      if (user.centerId !== id) throw new ForbiddenException();
      return this.prisma.center.update({ where: { id }, data: { name: dto.name, address: dto.address } });
    }
    return this.prisma.center.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.subscription.deleteMany({ where: { centerId: id } });
        await tx.salaryPayment.deleteMany({ where: { operator: { centerId: id } } });
        await tx.salarySetting.deleteMany({ where: { operator: { centerId: id } } });
        await tx.enrollment.deleteMany({
          where: {
            OR: [
              { student: { centerId: id } },
              { group: { centerId: id } },
            ],
          },
        });
        await tx.payment.deleteMany({ where: { centerId: id } });
        await tx.lead.deleteMany({ where: { centerId: id } });
        await tx.group.deleteMany({ where: { centerId: id } });
        await tx.student.deleteMany({ where: { centerId: id } });
        await tx.teacher.deleteMany({ where: { centerId: id } });
        await tx.course.deleteMany({ where: { centerId: id } });
        await tx.user.deleteMany({ where: { centerId: id } });

        return tx.center.delete({ where: { id } });
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2003') {
        throw new BadRequestException("Markazga bog'langan ma'lumotlar borligi sababli o'chirib bo'lmadi");
      }
      throw e;
    }
  }

  async getStats() {
    const [total, active, withExpiredSub] = await Promise.all([
      this.prisma.center.count(),
      this.prisma.center.count({ where: { isActive: true } }),
      this.prisma.subscription.count({ where: { status: 'EXPIRED' } }),
    ]);
    return { total, active, withExpiredSub };
  }

  async getDetailStats(centerId: string) {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // So'nggi 6 oy uchun boshlanish sanasi
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [
      studentsTotal,
      leadsTotal,
      leadsThisMonth,
      leadsEnrolled,
      leadsByStatus,
      paymentsAll,
      paymentsThisMonth,
      operators,
      salaryPayments,
      groupsCount,
      monthlyPayments,
    ] = await Promise.all([
      this.prisma.student.count({ where: { centerId, isDeleted: false } }),
      this.prisma.lead.count({ where: { centerId } }),
      this.prisma.lead.count({ where: { centerId, createdAt: { gte: monthStart } } }),
      this.prisma.lead.count({ where: { centerId, status: 'ENROLLED' } }),
      this.prisma.lead.groupBy({ by: ['status'], where: { centerId }, _count: true }),
      this.prisma.payment.aggregate({ where: { centerId, isRefunded: false, isDeleted: false }, _sum: { amount: true }, _count: true }),
      this.prisma.payment.aggregate({ where: { centerId, isRefunded: false, isDeleted: false, paidAt: { gte: monthStart } }, _sum: { amount: true }, _count: true }),
      this.prisma.user.findMany({
        where: { centerId, role: 'OPERATOR', isDeleted: false },
        select: {
          id: true, name: true, phone: true, isActive: true,
          salarySetting: { select: { percentage: true, fixedAmount: true } },
        },
      }),
      this.prisma.salaryPayment.groupBy({
        by: ['operatorId'],
        where: { operator: { centerId } },
        _sum: { totalAmount: true },
      }),
      this.prisma.group.count({ where: { centerId } }),
      this.prisma.payment.findMany({
        where: { centerId, isRefunded: false, isDeleted: false, paidAt: { gte: sixMonthsAgo } },
        select: { amount: true, paidAt: true },
      }),
    ]);

    const salaryMap = new Map(salaryPayments.map(s => [s.operatorId, Number(s._sum?.totalAmount ?? 0)]));

    // Oylar bo'yicha guruhlash
    const monthlyMap = new Map<string, number>();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap.set(key, 0);
    }
    for (const p of monthlyPayments) {
      const d = new Date(p.paidAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyMap.has(key)) {
        monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + Number(p.amount));
      }
    }

    const MONTHS_UZ = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
    const monthlyChart = Array.from(monthlyMap.entries()).map(([key, amount]) => {
      const [year, month] = key.split('-').map(Number);
      return { month: `${MONTHS_UZ[month - 1]} ${year}`, amount };
    });

    return {
      students: { total: studentsTotal, active: studentsTotal },
      leads: {
        total: leadsTotal,
        thisMonth: leadsThisMonth,
        enrolled: leadsEnrolled,
        conversionRate: leadsTotal > 0 ? Math.round((leadsEnrolled / leadsTotal) * 100) : 0,
        byStatus: leadsByStatus.map((s: any) => ({ status: s.status, count: s._count })),
      },
      payments: {
        totalAmount: Number(paymentsAll._sum?.amount ?? 0),
        totalCount: paymentsAll._count,
        thisMonthAmount: Number(paymentsThisMonth._sum?.amount ?? 0),
        thisMonthCount: paymentsThisMonth._count,
      },
      operators: operators.map(op => ({
        ...op,
        totalSalaryPaid: salaryMap.get(op.id) ?? 0,
      })),
      groups: groupsCount,
      monthlyChart,
    };
  }
}
