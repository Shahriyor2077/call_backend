import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('salary')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalaryController {
  constructor(private salaryService: SalaryService) {}

  @Get('me')
  @Roles(Role.OPERATOR)
  getMySalary(@CurrentUser() user: any) {
    return this.salaryService.getMysalary(user);
  }

  @Get('report')
  @Roles(Role.ADMIN)
  getReport(@CurrentUser() user: any, @Query('month') month?: string) {
    return this.salaryService.getReport(user, month);
  }
}
