import { PrismaClient, Prisma } from '@prisma/client';
export class OrderRepository {
    constructor(private prisma: PrismaClient) {}
    createOrder = async (orderData: Prisma.OrderCreateInput) => {
        return this.prisma.order.create({
            data: orderData,
        });
    };
}   