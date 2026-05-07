import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class LoginDto {
  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  centerId?: string;
}
