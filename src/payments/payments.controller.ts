import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) { }

  @Get('stats')
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getStats(@CurrentUser() user: any) {
    const where: any = { centerId: user.centerId, isRefunded: false };
    if (user.role === Role.OPERATOR) where.operatorId = user.id;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 86400000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [todayData, weekData, monthData] = await Promise.all([
      this.paymentsService.getStatsByPeriod(user, todayStart, now),
      this.paymentsService.getStatsByPeriod(user, weekStart, now),
      this.paymentsService.getStatsByPeriod(user, monthStart, now),
    ]);

    return {
      today: todayData,
      week: weekData,
      month: monthData,
    };
  }

  @Get()
  @Roles(Role.ADMIN, Role.OPERATOR)
  findAll(@CurrentUser() user: any, @Query() query: any) {
    const parsedQuery = {
      ...query,
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
    };
    return this.paymentsService.findAll(user, parsedQuery);
  }

  @Post()
  @Roles(Role.ADMIN, Role.OPERATOR)
  create(@Body() dto: CreatePaymentDto, @CurrentUser() user: any) {
    return this.paymentsService.create(dto, user);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.paymentsService.update(id, dto, user);
  }

  @Put(':id/refund')
  @Roles(Role.ADMIN)
  refund(@Param('id') id: string, @CurrentUser() user: any) {
    return this.paymentsService.refund(id, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.paymentsService.remove(id, user);
  }
}
