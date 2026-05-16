import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto';
import { AuthUser } from '../common/types';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) { }

  async findAll(user: AuthUser, query?: { page?: number; limit?: number; status?: string }) {
    const where: any = { centerId: user.centerId };
    if (user.role === Role.OPERATOR) where.operatorId = user.id;
    if (query?.status) where.status = query.status;

    const page = query?.page || 1;
    const limit = Math.min(query?.limit || 50, 200);
    const skip = (page - 1) * limit;

    // Count by status
    const baseWhere: any = { centerId: user.centerId };
    if (user.role === Role.OPERATOR) baseWhere.operatorId = user.id;

    const [leads, total, statusCounts] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: { operator: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      this.prisma.lead.count({ where }),
      Promise.all([
        this.prisma.lead.count({ where: { ...baseWhere, status: 'NEW' } }),
        this.prisma.lead.count({ where: { ...baseWhere, status: 'IN_PROGRESS' } }),
        this.prisma.lead.count({ where: { ...baseWhere, status: 'ENROLLED' } }),
        this.prisma.lead.count({ where: { ...baseWhere, status: 'NOT_COME' } }),
        this.prisma.lead.count({ where: { ...baseWhere, status: 'REJECTED' } }),
      ]),
    ]);

    return {
      data: leads,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        statusCounts: {
          NEW: statusCounts[0],
          IN_PROGRESS: statusCounts[1],
          ENROLLED: statusCounts[2],
          NOT_COME: statusCounts[3],
          REJECTED: statusCounts[4],
        },
      },
    };
  }

  async findOne(id: string, user: AuthUser) {
    const where: any = { id, centerId: user.centerId };
    if (user.role === Role.OPERATOR) where.operatorId = user.id;
    const lead = await this.prisma.lead.findFirst({ where });
    if (!lead) throw new NotFoundException('Lead topilmadi');
    return lead;
  }

  async create(dto: CreateLeadDto, user: AuthUser) {
    let operatorId = user.id;
    if (user.role === Role.ADMIN && dto.operatorId) {
      const operator = await this.prisma.user.findFirst({
        where: { id: dto.operatorId, centerId: user.centerId, role: Role.OPERATOR },
      });
      if (!operator) throw new NotFoundException('Operator topilmadi');
      operatorId = dto.operatorId;
    }

    return this.prisma.lead.create({
      data: {
        ...dto,
        centerId: user.centerId,
        operatorId,
      },
    });
  }

  async updateStatus(id: string, dto: UpdateLeadStatusDto, user: AuthUser) {
    await this.findOne(id, user);
    return this.prisma.lead.update({
      where: { id },
      data: { status: dto.status, notes: dto.notes },
    });
  }

  async update(id: string, dto: any, user: AuthUser) {
    await this.findOne(id, user);
    // centerId va operatorId ni update qilishga ruxsat yo'q
    const { centerId: _c, operatorId: _o, ...safeDto } = dto;
    return this.prisma.lead.update({ where: { id }, data: safeDto });
  }

  async remove(id: string, user: AuthUser) {
    await this.findOne(id, user);
    return this.prisma.lead.delete({ where: { id } });
  }
}
