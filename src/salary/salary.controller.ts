import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../common/types';
import { Role } from '@prisma/client';

@Controller('salary')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalaryController {
  constructor(private salaryService: SalaryService) { }

  @Get('me')
  @Roles(Role.OPERATOR)
  getMySalary(@CurrentUser() user: AuthUser) {
    return this.salaryService.getMysalary(user);
  }

  @Get('report')
  @Roles(Role.ADMIN)
  getReport(@CurrentUser() user: AuthUser, @Query('month') month?: string) {
    return this.salaryService.getReport(user, month);
  }

  @Post('pay/:operatorId')
  @Roles(Role.ADMIN)
  paySalary(
    @CurrentUser() user: AuthUser,
    @Param('operatorId') operatorId: string,
    @Body() body: { month: string; amount: number; bonusAmount: number; fixedAmount: number; notes?: string },
  ) {
    return this.salaryService.paySalary(user, operatorId, body);
  }

  @Get('history/all')
  @Roles(Role.ADMIN)
  getAllPaymentHistory(@Query('month') month?: string) {
    return this.salaryService.getAllPaymentHistory(month);
  }

  @Get('history/:operatorId')
  @Roles(Role.ADMIN, Role.OPERATOR)
  getPaymentHistory(@Param('operatorId') operatorId: string) {
    return this.salaryService.getPaymentHistory(operatorId);
  }
}
