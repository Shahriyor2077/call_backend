import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.subscription.findMany({
      include: { center: true, plan: true },
      orderBy: { endDate: 'asc' },
    });
  }

  async findByCenterId(centerId: string) {
    return this.prisma.subscription.findUnique({
      where: { centerId },
      include: { plan: true },
    });
  }

  async assignPlan(centerId: string, planId: string, demoOverride?: number) {
    const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Tarif topilmadi');

    const days = demoOverride ?? plan.durationDays;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    return this.prisma.subscription.upsert({
      where: { centerId },
      update: { planId, startDate, endDate, status: SubscriptionStatus.ACTIVE },
      create: { centerId, planId, startDate, endDate, status: SubscriptionStatus.ACTIVE },
    });
  }

  async giveDemo(centerId: string, days: number = 14) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const existing = await this.prisma.subscription.findUnique({ where: { centerId } });
    const freePlan = await this.prisma.plan.findFirst({ where: { isActive: true }, orderBy: { price: 'asc' } });

    if (!freePlan) throw new NotFoundException('Hech bir tarif mavjud emas');

    return this.prisma.subscription.upsert({
      where: { centerId },
      update: { startDate, endDate, status: SubscriptionStatus.DEMO },
      create: {
        centerId,
        planId: freePlan.id,
        startDate,
        endDate,
        status: SubscriptionStatus.DEMO,
      },
    });
  }

  async extend(id: string, days: number) {
    const sub = await this.prisma.subscription.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('Obuna topilmadi');

    const newEndDate = new Date(sub.endDate);
    newEndDate.setDate(newEndDate.getDate() + days);

    return this.prisma.subscription.update({
      where: { id },
      data: { endDate: newEndDate, status: SubscriptionStatus.ACTIVE },
    });
  }

  async checkAndUpdateExpired() {
    const now = new Date();
    await this.prisma.subscription.updateMany({
      where: { endDate: { lt: now }, status: SubscriptionStatus.ACTIVE },
      data: { status: SubscriptionStatus.EXPIRED },
    });
  }

  isAccessible(sub: any): boolean {
    if (!sub) return false;
    return sub.status === SubscriptionStatus.ACTIVE || sub.status === SubscriptionStatus.DEMO;
  }
}
