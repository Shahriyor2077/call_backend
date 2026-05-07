import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsOptional()
  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak' })
  phone?: string;

  @IsString()
  @IsNotEmpty()
  adminName: string;

  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak' })
  adminPhone: string;

  @IsString()
  @IsNotEmpty()
  adminPassword: string;
}
