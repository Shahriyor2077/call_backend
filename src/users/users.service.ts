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
    const where: any = { isDeleted: false };
    if (requestingUser.role === Role.ADMIN) {
      where.centerId = requestingUser.centerId;
      where.role = Role.OPERATOR;
    } else if (requestingUser.role === Role.SUPERADMIN && roleFilter) {
      where.role = roleFilter;
    }
    return this.prisma.user.findMany({
      where,
      select: {
        id: true, name: true, phone: true, role: true,
        isActive: true, isDeleted: true, centerId: true, center: true,
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
        isActive: true, isDeleted: true, centerId: true, center: true,
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
          where: { centerId: requestingUser.centerId, role: Role.OPERATOR, isActive: true, isDeleted: false },
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

    if (dto.phone && dto.phone !== user.phone) {
      const existing = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
      if (existing) throw new BadRequestException('Bu telefon raqam allaqachon mavjud');
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: dto,
        select: {
          id: true, name: true, phone: true, role: true,
          isActive: true, centerId: true, updatedAt: true,
        },
      });
    } catch (e: any) {
      if (e?.code === 'P2002') throw new BadRequestException('Bu telefon raqam allaqachon mavjud');
      throw e;
    }
  }

  async block(id: string, requestingUser: any) {
    const user = await this.findOne(id);

    if (requestingUser.role === Role.ADMIN) {
      if (user.centerId !== requestingUser.centerId) throw new ForbiddenException();
      if (user.role !== Role.OPERATOR) throw new ForbiddenException('Admin faqat operatorni bloklashi mumkin');
    }

    if (user.isDeleted) throw new BadRequestException('Foydalanuvchi o\'chirilgan');
    if (!user.isActive) throw new BadRequestException('Foydalanuvchi allaqachon bloklangan');

    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: { id: true, name: true, isActive: true },
    });
  }

  async unblock(id: string, requestingUser: any) {
    const user = await this.findOne(id);

    if (requestingUser.role === Role.ADMIN) {
      if (user.centerId !== requestingUser.centerId) throw new ForbiddenException();
      if (user.role !== Role.OPERATOR) throw new ForbiddenException('Admin faqat operatorni faollashtirishi mumkin');
    }

    if (user.isDeleted) throw new BadRequestException('Foydalanuvchi o\'chirilgan');
    if (user.isActive) throw new BadRequestException('Foydalanuvchi allaqachon faol');

    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
      select: { id: true, name: true, isActive: true },
    });
  }

  async remove(id: string, requestingUser: any) {
    const user = await this.findOne(id);

    if (requestingUser.role === Role.ADMIN) {
      if (user.centerId !== requestingUser.centerId) throw new ForbiddenException();
      if (user.role !== Role.OPERATOR) throw new ForbiddenException('Admin faqat operatorni o\'chira oladi');
    }

    await this.prisma.user.update({
      where: { id },
      data: { isDeleted: true, isActive: false, phone: `deleted_${id}_${user.phone}` },
    });
    return { id, deleted: true };
  }

  async updateSalaryPercentage(operatorId: string, percentage: number, adminCenterId: string, fixedAmount?: number) {
    const operator = await this.prisma.user.findUnique({ where: { id: operatorId } });
    if (!operator || operator.centerId !== adminCenterId) throw new ForbiddenException();
    if (percentage < 1 || percentage > 50) {
      throw new BadRequestException('Foiz 1% dan 50% gacha bo\'lishi kerak');
    }
    return this.prisma.salarySetting.upsert({
      where: { operatorId },
      update: { percentage, fixedAmount: fixedAmount ?? 0, updatedAt: new Date() },
      create: { operatorId, percentage, fixedAmount: fixedAmount ?? 0, updatedAt: new Date() },
    });
  }
}
