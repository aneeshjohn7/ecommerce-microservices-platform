import { PrismaClient, Prisma } from '@prisma/client';

export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}
  // include expires_at field in the refresh token model and set it to 7 days from now
  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    });
  }

}
