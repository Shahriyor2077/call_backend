import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { GroupStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  findAll(user: any) {
    return this.prisma.group.findMany({
      where: { centerId: user.centerId, isArchived: false },
      include: {
        course: true,
        teacher: { select: { id: true, name: true, specialty: true } },
        _count: { select: { enrollments: { where: { isActive: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, centerId: string) {
    const group = await this.prisma.group.findFirst({
      where: { id, centerId, isArchived: false },
      include: {
        course: true,
        enrollments: {
          where: { isActive: true },
          include: {
            student: {
              include: { operator: { select: { id: true, name: true } } },
            },
          },
        },
      },
    });
    if (!group) throw new NotFoundException('Guruh topilmadi');
    return group;
  }

  async create(dto: CreateGroupDto, user: any) {
    const course = await this.prisma.course.findFirst({
      where: { id: dto.courseId, centerId: user.centerId },
    });
    if (!course) throw new NotFoundException('Kurs topilmadi');

    const data: any = {
      ...dto,
      centerId: user.centerId,
      meetLink:  dto.meetLink  || null,
      platform:  dto.platform  || null,
      room:      dto.room      || null,
      address:   dto.address   || null,
      teacherId: dto.teacherId || null,
    };

    if (data.startDate) data.startDate = new Date(data.startDate);
    else delete data.startDate;

    if (data.endDate) data.endDate = new Date(data.endDate);
    else delete data.endDate;

    try {
      return await this.prisma.group.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') throw new BadRequestException('Noto\'g\'ri bog\'liq ma\'lumot (teacher yoki kurs)');
        throw new BadRequestException(`Ma'lumotlar bazasi xatosi: ${e.code}`);
      }
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Yuborilgan ma\'lumotlarda xatolik bor');
      }
      throw e;
    }
  }

  async update(id: string, dto: any, user: any) {
    const group = await this.findOne(id, user.centerId);

    if (dto.maxStudents !== undefined) {
      const activeCount = group.enrollments.length;
      if (dto.maxStudents < activeCount) {
        throw new BadRequestException(
          `Sig'imni ${activeCount} dan kam qilish mumkin emas — hozir ${activeCount} ta faol talaba bor`,
        );
      }
    }

    const data: any = { ...dto };
    if (data.startDate) data.startDate = new Date(data.startDate).toISOString();
    if (data.endDate) data.endDate = new Date(data.endDate).toISOString();
    else delete data.endDate;
    return this.prisma.group.update({ where: { id }, data });
  }

  async archive(id: string, user: any) {
    await this.findOne(id, user.centerId);
    return this.prisma.group.update({ where: { id }, data: { isArchived: true } });
  }

  async transfer(studentId: string, fromGroupId: string, toGroupId: string, centerId: string) {
    await this.prisma.enrollment.updateMany({
      where: { studentId, groupId: fromGroupId, isActive: true },
      data: { isActive: false },
    });
    return this.enroll(toGroupId, studentId, centerId);
  }

  async enroll(groupId: string, studentId: string, centerId: string) {
    const group = await this.prisma.group.findFirst({
      where: { id: groupId, centerId },
      include: { _count: { select: { enrollments: { where: { isActive: true } } } } },
    });

    if (!group) throw new NotFoundException('Guruh topilmadi');
    if (group.status !== GroupStatus.ACTIVE && group.status !== GroupStatus.GATHERING) {
      throw new BadRequestException('Bu guruhga yozilish mumkin emas');
    }
    if (group._count.enrollments >= group.maxStudents) {
      throw new BadRequestException('Guruh to\'lgan');
    }

    const existing = await this.prisma.enrollment.findUnique({
      where: { studentId_groupId: { studentId, groupId } },
    });
    if (existing?.isActive) throw new BadRequestException('Talaba allaqachon bu guruhda');

    return this.prisma.enrollment.upsert({
      where: { studentId_groupId: { studentId, groupId } },
      update: { isActive: true },
      create: { studentId, groupId },
    });
  }
}
