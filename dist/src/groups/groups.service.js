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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let GroupsService = class GroupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(user) {
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
    async findOne(id, centerId) {
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
        if (!group)
            throw new common_1.NotFoundException('Guruh topilmadi');
        return group;
    }
    async create(dto, user) {
        const course = await this.prisma.course.findFirst({
            where: { id: dto.courseId, centerId: user.centerId },
        });
        if (!course)
            throw new common_1.NotFoundException('Kurs topilmadi');
        const data = {
            ...dto,
            centerId: user.centerId,
            meetLink: dto.meetLink || null,
            platform: dto.platform || null,
            room: dto.room || null,
            address: dto.address || null,
            teacherId: dto.teacherId || null,
        };
        if (data.startDate)
            data.startDate = new Date(data.startDate);
        else
            delete data.startDate;
        if (data.endDate)
            data.endDate = new Date(data.endDate);
        else
            delete data.endDate;
        try {
            return await this.prisma.group.create({ data });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2003')
                    throw new common_1.BadRequestException('Noto\'g\'ri bog\'liq ma\'lumot (teacher yoki kurs)');
                throw new common_1.BadRequestException(`Ma'lumotlar bazasi xatosi: ${e.code}`);
            }
            if (e instanceof client_1.Prisma.PrismaClientValidationError) {
                throw new common_1.BadRequestException('Yuborilgan ma\'lumotlarda xatolik bor');
            }
            throw e;
        }
    }
    async update(id, dto, user) {
        const group = await this.findOne(id, user.centerId);
        if (dto.maxStudents !== undefined) {
            const activeCount = group.enrollments.length;
            if (dto.maxStudents < activeCount) {
                throw new common_1.BadRequestException(`Sig'imni ${activeCount} dan kam qilish mumkin emas — hozir ${activeCount} ta faol talaba bor`);
            }
        }
        const data = { ...dto };
        if (data.startDate)
            data.startDate = new Date(data.startDate).toISOString();
        if (data.endDate)
            data.endDate = new Date(data.endDate).toISOString();
        else
            delete data.endDate;
        return this.prisma.group.update({ where: { id }, data });
    }
    async archive(id, user) {
        await this.findOne(id, user.centerId);
        return this.prisma.group.update({ where: { id }, data: { isArchived: true } });
    }
    async transfer(studentId, fromGroupId, toGroupId, centerId) {
        await this.prisma.enrollment.updateMany({
            where: { studentId, groupId: fromGroupId, isActive: true },
            data: { isActive: false },
        });
        return this.enroll(toGroupId, studentId, centerId);
    }
    async unenroll(groupId, studentId, centerId) {
        const group = await this.prisma.group.findFirst({ where: { id: groupId, centerId } });
        if (!group)
            throw new common_1.NotFoundException('Guruh topilmadi');
        return this.prisma.enrollment.updateMany({
            where: { studentId, groupId, isActive: true },
            data: { isActive: false },
        });
    }
    async enroll(groupId, studentId, centerId) {
        const group = await this.prisma.group.findFirst({
            where: { id: groupId, centerId },
            include: { _count: { select: { enrollments: { where: { isActive: true } } } } },
        });
        if (!group)
            throw new common_1.NotFoundException('Guruh topilmadi');
        if (group.status !== client_1.GroupStatus.ACTIVE && group.status !== client_1.GroupStatus.GATHERING) {
            throw new common_1.BadRequestException('Bu guruhga yozilish mumkin emas');
        }
        if (group._count.enrollments >= group.maxStudents) {
            throw new common_1.BadRequestException('Guruh to\'lgan');
        }
        const existing = await this.prisma.enrollment.findUnique({
            where: { studentId_groupId: { studentId, groupId } },
        });
        if (existing?.isActive)
            throw new common_1.BadRequestException('Talaba allaqachon bu guruhda');
        return this.prisma.enrollment.upsert({
            where: { studentId_groupId: { studentId, groupId } },
            update: { isActive: true },
            create: { studentId, groupId },
        });
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map