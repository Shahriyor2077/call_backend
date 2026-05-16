import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthUser } from '../common/types';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll(user: AuthUser) {
    return this.prisma.course.findMany({
      where: { centerId: user.centerId, isActive: true },
      include: {
        _count: { select: { groups: { where: { isArchived: false } } } },
        groups: {
          where: { isArchived: false },
          include: {
            teacher: { select: { id: true, name: true } },
            _count: { select: { enrollments: { where: { isActive: true } } } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, centerId: string) {
    const course = await this.prisma.course.findFirst({
      where: { id, centerId },
      include: { groups: true },
    });
    if (!course) throw new NotFoundException('Kurs topilmadi');
    return course;
  }

  async create(dto: CreateCourseDto, user: AuthUser) {
    return this.prisma.course.create({
      data: {
        ...dto,
        centerId: user.centerId,
        durationUnit: dto.durationUnit ?? 'month',
        duration: dto.duration ?? 1,
        price: dto.price ?? 0,
        maxStudents: dto.maxStudents ?? 999,
      },
    });
  }

  async update(id: string, dto: any, user: AuthUser) {
    await this.findOne(id, user.centerId);
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async remove(id: string, user: AuthUser) {
    await this.findOne(id, user.centerId);
    return this.prisma.course.update({ where: { id }, data: { isActive: false } });
  }
}
