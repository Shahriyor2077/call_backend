import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Role, SubscriptionStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: string; phone: string; role: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        center: {
          include: { subscription: true },
        },
      },
    });

    if (!user || !user.isActive) throw new UnauthorizedException();

    if (user.role !== Role.SUPERADMIN) {
      const sub = user.center?.subscription;
      const now = new Date();
      const isValid =
        sub &&
        sub.endDate >= now &&
        (sub.status === SubscriptionStatus.ACTIVE || sub.status === SubscriptionStatus.DEMO);

      if (!isValid) {
        throw new ForbiddenException(
          'Obuna muddati tugagan. Iltimos, superadmin bilan bog\'laning.',
        );
      }
    }

    return user;
  }
}
