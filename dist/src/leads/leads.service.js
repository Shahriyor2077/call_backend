"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let LeadsService = class LeadsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(user, query) {
        const where = { centerId: user.centerId };
        if (user.role === client_1.Role.OPERATOR)
            where.operatorId = user.id;
        if (query?.status)
            where.status = query.status;
        const page = query?.page || 1;
        const limit = Math.min(query?.limit || 50, 200);
        const skip = (page - 1) * limit;
        const baseWhere = { centerId: user.centerId };
        if (user.role === client_1.Role.OPERATOR)
            baseWhere.operatorId = user.id;
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
    async findOne(id, user) {
        const where = { id, centerId: user.centerId };
        if (user.role === client_1.Role.OPERATOR)
            where.operatorId = user.id;
        const lead = await this.prisma.lead.findFirst({ where });
        if (!lead)
            throw new common_1.NotFoundException('Lead topilmadi');
        return lead;
    }
    async create(dto, user) {
        let operatorId = user.id;
        if (user.role === client_1.Role.ADMIN && dto.operatorId) {
            const operator = await this.prisma.user.findFirst({
                where: { id: dto.operatorId, centerId: user.centerId, role: client_1.Role.OPERATOR },
            });
            if (!operator)
                throw new common_1.NotFoundException('Operator topilmadi');
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
    async updateStatus(id, dto, user) {
        await this.findOne(id, user);
        return this.prisma.lead.update({
            where: { id },
            data: { status: dto.status, notes: dto.notes },
        });
    }
    async update(id, dto, user) {
        await this.findOne(id, user);
        const { centerId: _c, operatorId: _o, ...safeDto } = dto;
        return this.prisma.lead.update({ where: { id }, data: safeDto });
    }
    async remove(id, user) {
        await this.findOne(id, user);
        return this.prisma.lead.delete({ where: { id } });
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map