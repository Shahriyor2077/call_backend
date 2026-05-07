import { Role } from '@prisma/client';
export declare class CreateUserDto {
    phone: string;
    password: string;
    name: string;
    role: Role;
    centerId?: string;
}
