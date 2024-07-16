import { PrismaClient, Prisma } from '@prisma/client';

export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.RefreshTokenCreateInput) {
    return this.prisma.refreshToken.create({ data });
  }
  /**
   * Find a refresh token by its ID.
   * @param id - The ID of the refresh token to find.
   * @returns The refresh token if found, otherwise null.
   */
  async findById(id: string) {
    return this.prisma.refreshToken.findUnique({
      where: { id },
    });
  }

  /**
   * Find a refresh token by its token string.
   * @param token - The token string of the refresh token to find.
   * @returns The refresh token if found, otherwise null.
   */
  async findByToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  /**
   * Find an active refresh token by its token string.
   * @param token - The token string of the refresh token to find.
   * @returns The active refresh token if found, otherwise null.
   */           
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

  /**
   * Revoke a refresh token by its ID.
   * @param id - The ID of the refresh token to revoke.
   * @returns The revoked refresh token.
   */
  async revokeToken(id: string) {
    return this.prisma.refreshToken.update({
      where: { id },
      data: { revoked: true },
    });
  }

  /**
   * Revoke all refresh tokens for a user.
   * @param userId - The ID of the user whose tokens to revoke.
   * @returns The number of revoked tokens.
   */
  async revokeAllUserTokens(userId: string) {
    return this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: { revoked: true },
    });
  }

  /**
   * Update a refresh token by its ID.
   * @param id - The ID of the refresh token to update.
   * @param data - The data to update the refresh token with.
   * @returns The updated refresh token.
   */
  async updateToken(id: string, data: Prisma.RefreshTokenUpdateInput) {
    return this.prisma.refreshToken.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete expired refresh tokens.
   * @returns The number of deleted tokens.
   */
  async deleteExpiredTokens() {
    return this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  /**
   * List all refresh tokens for a user.
   * @param userId - The ID of the user whose tokens to list.
   * @returns An array of refresh tokens.
   */
  async listUserTokens(userId: string) {
    return this.prisma.refreshToken.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
