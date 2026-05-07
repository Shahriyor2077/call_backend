import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  findAll(centerId: string) {
    return this.prisma.teacher.findMany({
      where: { centerId, isActive: true },
      include: {
        _count: {
          select: {
            groups: { where: { isArchived: false } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateTeacherDto, centerId: string) {
    return this.prisma.teacher.create({
      data: { ...dto, centerId },
    });
  }

  async update(id: string, dto: Partial<CreateTeacherDto> & { isActive?: boolean }, centerId: string) {
    const teacher = await this.prisma.teacher.findFirst({ where: { id, centerId } });
    if (!teacher) throw new NotFoundException('O\'qituvchi topilmadi');
    return this.prisma.teacher.update({ where: { id }, data: dto });
  }
}
