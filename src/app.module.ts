import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CentersModule } from './centers/centers.module';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { LeadsModule } from './leads/leads.module';
import { StudentsModule } from './students/students.module';
import { PaymentsModule } from './payments/payments.module';
import { SalaryModule } from './salary/salary.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CentersModule,
    UsersModule,
    PlansModule,
    SubscriptionsModule,
    CoursesModule,
    GroupsModule,
    LeadsModule,
    StudentsModule,
    PaymentsModule,
    SalaryModule,
    TeachersModule,
  ],
})
export class AppModule {}
