import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon +998XXXXXXXXX formatida bo\'lishi kerak' })
  phone: string;

  @IsString()
  @IsOptional()
  specialty?: string;
}
