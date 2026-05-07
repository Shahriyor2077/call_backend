import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('plans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  @Roles(Role.SUPERADMIN)
  findAll() {
    return this.plansService.findAll();
  }

  @Post()
  @Roles(Role.SUPERADMIN)
  create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @Put(':id')
  @Roles(Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() dto: any) {
    return this.plansService.update(id, dto);
  }
}
