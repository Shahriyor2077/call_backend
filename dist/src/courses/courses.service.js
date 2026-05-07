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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(user) {
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
    async findOne(id, centerId) {
        const course = await this.prisma.course.findFirst({
            where: { id, centerId },
            include: { groups: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Kurs topilmadi');
        return course;
    }
    async create(dto, user) {
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
    async update(id, dto, user) {
        await this.findOne(id, user.centerId);
        return this.prisma.course.update({ where: { id }, data: dto });
    }
    async remove(id, user) {
        await this.findOne(id, user.centerId);
        return this.prisma.course.update({ where: { id }, data: { isActive: false } });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map