import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    me(user: any): any;
}
