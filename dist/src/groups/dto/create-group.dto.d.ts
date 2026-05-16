import { GroupType } from '@prisma/client';
export declare class CreateGroupDto {
    courseId: string;
    name: string;
    type: GroupType;
    maxStudents?: number;
    price?: number;
    meetLink?: string;
    platform?: string;
    room?: string;
    address?: string;
    days: string[];
    startTime?: string;
    endTime?: string;
    startDate?: string;
    endDate?: string;
    duration?: number;
    durationUnit?: string;
    teacherId?: string;
}
