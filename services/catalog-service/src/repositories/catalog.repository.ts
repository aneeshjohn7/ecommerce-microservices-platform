import { PrismaClient } from '@prisma/client';
export class CatalogRepository {
    constructor(private prisma: PrismaClient) {}
    async getProduct(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        return product;
    }

}   