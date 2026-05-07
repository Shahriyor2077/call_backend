import { PaymentType, PaymentMethod } from '@prisma/client';
export declare class CreatePaymentDto {
    studentId: string;
    amount: number;
    type: PaymentType;
    method: PaymentMethod;
    notes?: string;
    paidAt?: string;
}
