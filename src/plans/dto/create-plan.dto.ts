import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  operatorLimit: number;

  @IsInt()
  @IsPositive()
  durationDays: number;
}
