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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TeachersService = class TeachersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(centerId) {
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
    async create(dto, centerId) {
        return this.prisma.teacher.create({
            data: { ...dto, centerId },
        });
    }
    async update(id, dto, centerId) {
        const teacher = await this.prisma.teacher.findFirst({ where: { id, centerId } });
        if (!teacher)
            throw new common_1.NotFoundException('O\'qituvchi topilmadi');
        return this.prisma.teacher.update({ where: { id }, data: dto });
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map