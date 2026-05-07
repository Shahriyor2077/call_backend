import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: string;
        phone: string;
        role: string;
    }): Promise<{
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
    } & {
        id: string;
        phone: string;
        password: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        centerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
