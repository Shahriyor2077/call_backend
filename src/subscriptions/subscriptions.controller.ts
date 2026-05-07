import { Controller, Get, Put, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get()
  @Roles(Role.SUPERADMIN)
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Post('assign')
  @Roles(Role.SUPERADMIN)
  assignPlan(@Body() body: { centerId: string; planId: string }) {
    return this.subscriptionsService.assignPlan(body.centerId, body.planId);
  }

  @Post('demo')
  @Roles(Role.SUPERADMIN)
  giveDemo(@Body() body: { centerId: string; days?: number }) {
    return this.subscriptionsService.giveDemo(body.centerId, body.days);
  }

  @Put(':id/extend')
  @Roles(Role.SUPERADMIN)
  extend(@Param('id') id: string, @Body('days') days: number) {
    return this.subscriptionsService.extend(id, days);
  }
}
