import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private studentsService: StudentsService) { }

  @Get()
  @Roles(Role.ADMIN, Role.OPERATOR)
  findAll(@CurrentUser() user: any) {
    return this.studentsService.findAll(user);
  }

  @Get('debtors')
  @Roles(Role.ADMIN, Role.OPERATOR)
  getDebtors(@CurrentUser() user: any) {
    return this.studentsService.getDebtors(user);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.OPERATOR)
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.studentsService.findOne(id, user);
  }

  @Post()
  @Roles(Role.ADMIN, Role.OPERATOR)
  create(@Body() dto: CreateStudentDto, @CurrentUser() user: any) {
    return this.studentsService.create(dto, user);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.OPERATOR)
  update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.studentsService.update(id, dto, user);
  }

  @Post(':id/enroll')
  @Roles(Role.ADMIN, Role.OPERATOR)
  async enroll(
    @Param('id') studentId: string,
    @Body('groupId') groupId: string,
    @CurrentUser() user: any,
  ) {
    await this.studentsService.findOne(studentId, user);
    return this.studentsService.enrollStudent(studentId, groupId, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.studentsService.remove(id, user);
  }
}
