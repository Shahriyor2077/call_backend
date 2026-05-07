import {
  IsString, IsNotEmpty, IsEnum, IsInt, IsPositive,
  IsOptional, IsNumber, IsArray,
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
  @IsPositive()
  maxStudents: number;

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

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

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
