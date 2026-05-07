import { IsString, IsNotEmpty, IsEnum, IsOptional, Matches } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsOptional()
  centerId?: string;
}
