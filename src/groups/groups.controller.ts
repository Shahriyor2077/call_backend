import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../common/types';
import { Role } from '@prisma/client';

@Controller('groups')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) { }

  @Get()
  @Roles(Role.ADMIN, Role.OPERATOR)
  findAll(@CurrentUser() user: AuthUser) {
    return this.groupsService.findAll(user);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.OPERATOR)
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.groupsService.findOne(id, user.centerId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateGroupDto, @CurrentUser() user: AuthUser) {
    return this.groupsService.create(dto, user);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: AuthUser) {
    return this.groupsService.update(id, dto, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  archive(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.groupsService.archive(id, user);
  }

  @Post(':id/enroll')
  @Roles(Role.ADMIN, Role.OPERATOR)
  enroll(
    @Param('id') groupId: string,
    @Body('studentId') studentId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.groupsService.enroll(groupId, studentId, user.centerId);
  }

  @Delete(':id/enroll/:studentId')
  @Roles(Role.ADMIN, Role.OPERATOR)
  unenroll(
    @Param('id') groupId: string,
    @Param('studentId') studentId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.groupsService.unenroll(groupId, studentId, user.centerId);
  }

  @Post('transfer')
  @Roles(Role.ADMIN, Role.OPERATOR)
  transfer(
    @Body('studentId') studentId: string,
    @Body('fromGroupId') fromGroupId: string,
    @Body('toGroupId') toGroupId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.groupsService.transfer(studentId, fromGroupId, toGroupId, user.centerId);
  }
}
