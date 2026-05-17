import { PaymentType, PaymentMethod } from '@prisma/client';
export declare class CreatePaymentDto {
    studentId: string;
    totalAmount: number;
    discountAmount?: number;
    type: PaymentType;
    method: PaymentMethod;
    notes?: string;
    paidAt?: string;
}
