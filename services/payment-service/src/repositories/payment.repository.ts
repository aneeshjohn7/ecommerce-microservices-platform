import { Prisma, PrismaClient } from '@prisma/client';
export class PaymentRepository {
    constructor(private prisma: PrismaClient) {}

    async createPayment(paymentData: Prisma.PaymentCreateInput) {
        return this.prisma.payment.create({
            data: paymentData,
        });
    }
    async updatePaymentStatus(updateData: { orderId: string; status: string }) {
        // find payment id using order id
        const existingPayment = await this.prisma.payment.findFirst({
            where: {
                orderId: updateData.orderId,
            },
        });

        if (!existingPayment) {
            throw new Error(`Payment with orderId ${updateData.orderId} not found`);
        }

        return this.prisma.payment.update({
            where: {
                id: existingPayment.id,
            },
            data: {
                status: updateData.status,
            },
        });

    }
}
