import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('groups')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) { }

  @Get()
  @Roles(Role.ADMIN, Role.OPERATOR)
  findAll(@CurrentUser() user: any) {
    return this.groupsService.findAll(user);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.OPERATOR)
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.groupsService.findOne(id, user.centerId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateGroupDto, @CurrentUser() user: any) {
    return this.groupsService.create(dto, user);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    return this.groupsService.update(id, dto, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  archive(@Param('id') id: string, @CurrentUser() user: any) {
    return this.groupsService.archive(id, user);
  }

  @Post(':id/enroll')
  @Roles(Role.ADMIN, Role.OPERATOR)
  enroll(
    @Param('id') groupId: string,
    @Body('studentId') studentId: string,
    @CurrentUser() user: any,
  ) {
    return this.groupsService.enroll(groupId, studentId, user.centerId);
  }

  @Post('enroll')
  @Roles(Role.ADMIN, Role.OPERATOR)
  enrollDirect(
    @Body('groupId') groupId: string,
    @Body('studentId') studentId: string,
    @CurrentUser() user: any,
  ) {
    return this.groupsService.enroll(groupId, studentId, user.centerId);
  }

  @Post('transfer')
  @Roles(Role.ADMIN, Role.OPERATOR)
  transfer(
    @Body('studentId') studentId: string,
    @Body('fromGroupId') fromGroupId: string,
    @Body('toGroupId') toGroupId: string,
    @CurrentUser() user: any,
  ) {
    return this.groupsService.transfer(studentId, fromGroupId, toGroupId, user.centerId);
  }
}
