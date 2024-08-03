import { PrismaClient, Prisma } from '@prisma/client';
export class OrderRepository {
    constructor(private prisma: PrismaClient) {}

    async createOrder(orderData: Prisma.OrderCreateInput) {
        return this.prisma.order.create({
            data: orderData,
            include: {
                items: true,
            },
        });
    }

}   