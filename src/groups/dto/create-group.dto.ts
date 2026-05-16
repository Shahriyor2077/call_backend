import {
  IsString, IsNotEmpty, IsEnum, IsInt,
  IsOptional, IsNumber, IsArray, Matches,
} from 'class-validator';
import { GroupType } from '@prisma/client';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(GroupType)
  type: GroupType;

  @IsInt()
  @IsOptional()
  maxStudents?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  meetLink?: string;

  @IsString()
  @IsOptional()
  platform?: string;

  @IsString()
  @IsOptional()
  room?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsArray()
  @IsString({ each: true })
  days: string[];

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, { message: 'startTime HH:mm formatida bo\'lishi kerak' })
  startTime?: string;

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, { message: 'endTime HH:mm formatida bo\'lishi kerak' })
  endTime?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  durationUnit?: string;

  @IsString()
  @IsOptional()
  teacherId?: string;
}
