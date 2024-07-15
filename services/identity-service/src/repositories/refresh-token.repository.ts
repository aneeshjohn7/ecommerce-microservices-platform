import { PrismaClient, Prisma } from '@prisma/client';

export class RefreshTokenRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(data: Prisma.RefreshTokenCreateInput) {
        return this.prisma.refreshToken.create({ data });
    }

    async findById(id: string) {
        return this.prisma.refreshToken.findUnique({
            where: { id },
        });
    }

    async findByToken(token: string) {
        return this.prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });
    }

    async findActiveToken(token: string) {
        return this.prisma.refreshToken.findFirst({
            where: {
                token,
                revoked: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });
    }

    async revokeToken(id: string) {
        return this.prisma.refreshToken.update({
            where: { id },
            data: { revoked: true },
        });
    }

    async revokeAllUserTokens(userId: string) {
        return this.prisma.refreshToken.updateMany({
            where: {
                userId,
                revoked: false,
            },
            data: { revoked: true },
        });
    }

    async updateToken(
        id: string,
        data: Prisma.RefreshTokenUpdateInput,
    ) {
        return this.prisma.refreshToken.update({
            where: { id },
            data,
        });
    }

    async deleteExpiredTokens() {
        return this.prisma.refreshToken.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
    }

    async listUserTokens(userId: string) {
        return this.prisma.refreshToken.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
}