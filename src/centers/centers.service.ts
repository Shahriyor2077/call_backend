import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCenterDto } from './dto/create-center.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CentersService {
  constructor(private prisma: PrismaService) { }

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
    return this.prisma.center.delete({ where: { id } });
  }

  async getStats() {
    const [total, active, withExpiredSub] = await Promise.all([
      this.prisma.center.count(),
      this.prisma.center.count({ where: { isActive: true } }),
      this.prisma.subscription.count({ where: { status: 'EXPIRED' } }),
    ]);
    return { total, active, withExpiredSub };
  }
}
