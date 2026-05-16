import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) { }

  async findAll(requestingUser: any, roleFilter?: string) {
    const where: any = { isActive: true };
    if (requestingUser.role === Role.ADMIN) {
      where.centerId = requestingUser.centerId;
      where.role = Role.OPERATOR;
    }
    if (roleFilter) {
      where.role = roleFilter;
    }
    return this.prisma.user.findMany({
      where,
      select: {
        id: true, name: true, phone: true, role: true,
        isActive: true, centerId: true, center: true,
        createdAt: true, salarySetting: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true, name: true, phone: true, role: true,
        isActive: true, centerId: true, center: true,
        createdAt: true, salarySetting: true,
      },
    });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');
    return user;
  }

  async create(dto: CreateUserDto, requestingUser: any) {
    if (requestingUser.role === Role.ADMIN) {
      if (dto.role !== Role.OPERATOR) {
        throw new ForbiddenException('Admin faqat operator yarata oladi');
      }
      dto.centerId = requestingUser.centerId;

      const sub = await this.prisma.subscription.findUnique({
        where: { centerId: requestingUser.centerId },
        include: { plan: true },
      });

      if (sub && sub.status === 'ACTIVE') {
        const operatorCount = await this.prisma.user.count({
          where: { centerId: requestingUser.centerId, role: Role.OPERATOR, isActive: true },
        });
        if (operatorCount >= sub.plan.operatorLimit) {
          throw new BadRequestException(
            `Tarif limiti: maksimal ${sub.plan.operatorLimit} ta operator`,
          );
        }
      }
    }

    const existing = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
    if (existing) throw new BadRequestException('Bu telefon raqam allaqachon mavjud');

    const hashedPassword = await this.authService.hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
      select: {
        id: true, name: true, phone: true, role: true,
        isActive: true, centerId: true, createdAt: true,
      },
    });

    if (user.role === Role.OPERATOR) {
      await this.prisma.salarySetting.create({
        data: { operatorId: user.id, percentage: 10, fixedAmount: 0, updatedAt: new Date() },
      });
    }

    return user;
  }

  async update(id: string, dto: any, requestingUser: any) {
    const user = await this.findOne(id);

    if (requestingUser.role === Role.ADMIN && user.centerId !== requestingUser.centerId) {
      throw new ForbiddenException();
    }

    if (dto.password) {
      dto.password = await this.authService.hashPassword(dto.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true, name: true, phone: true, role: true,
        isActive: true, centerId: true, updatedAt: true,
      },
    });
  }

  async remove(id: string, requestingUser: any) {
    const user = await this.findOne(id);

    if (requestingUser.role === Role.ADMIN) {
      if (user.centerId !== requestingUser.centerId) throw new ForbiddenException();
      if (user.role !== Role.OPERATOR) throw new ForbiddenException('Admin faqat operatorni o\'chira oladi');
    }

    await this.prisma.user.update({ where: { id }, data: { isActive: false } });
    return { id, deleted: true };
  }

  async updateSalaryPercentage(operatorId: string, percentage: number, adminCenterId: string, fixedAmount?: number) {
    const operator = await this.prisma.user.findUnique({ where: { id: operatorId } });
    if (!operator || operator.centerId !== adminCenterId) throw new ForbiddenException();
    if (percentage < 1 || percentage > 50) {
      throw new BadRequestException('Foiz 1% dan 50% gacha bo\'lishi kerak');
    }

    const data: any = { percentage, updatedAt: new Date() };
    if (fixedAmount !== undefined) {
      data.fixedAmount = fixedAmount;
    }

    return this.prisma.salarySetting.upsert({
      where: { operatorId },
      update: data,
      create: { operatorId, percentage, fixedAmount: fixedAmount ?? 0, updatedAt: new Date() },
    });
  }
}
