import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDemoRequestDto {
    @IsString()
    @IsNotEmpty()
    centerName: string;

    @IsString()
    @IsNotEmpty()
    contactPerson: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
