import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.teachersService.findAll(user.centerId);
  }

  @Post()
  create(@Body() dto: CreateTeacherDto, @CurrentUser() user: any) {
    return this.teachersService.create(dto, user.centerId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.teachersService.update(id, dto, user.centerId);
  }
}
