import { PrismaClient } from '@prisma/client';
export class UserRoleRepository {
  constructor(private prisma: PrismaClient) {}

  async assignRoleToUser(userId: string, roleId: string) {
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });
  }

  async findRolesByUserId(userId: string) {
    return this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });
  }

}