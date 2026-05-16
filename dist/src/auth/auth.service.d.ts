import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AuthUser } from '../common/types';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            phone: string;
            role: import("@prisma/client").$Enums.Role;
            centerId: string | null;
            center: ({
                subscription: {
                    id: string;
                    centerId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    planId: string;
                    status: import("@prisma/client").$Enums.SubscriptionStatus;
                    startDate: Date;
                    endDate: Date;
                } | null;
            } & {
                id: string;
                phone: string | null;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                address: string | null;
            }) | null;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(user: AuthUser): {
        id: string;
        name: string;
        phone: string;
        role: import("@prisma/client").Role;
        centerId: string;
        isActive: boolean;
        center?: {
            id: string;
            name: string;
            subscription?: {
                status: string;
                endDate: Date;
            } | null;
        } | null;
        createdAt: Date;
        updatedAt: Date;
    };
    private generateTokens;
    hashPassword(password: string): Promise<string>;
}
