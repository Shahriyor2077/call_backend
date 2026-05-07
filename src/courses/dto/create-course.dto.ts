import { IsString, IsNotEmpty, IsNumber, IsInt, IsOptional, IsIn, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['month', 'hour'])
  @IsOptional()
  durationUnit?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  maxStudents?: number;
}
