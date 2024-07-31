import { PrismaClient, Role } from '@prisma/client';
export class RoleRepository {
  constructor(private prisma: PrismaClient) {}

  async findByName(name: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { name },
    });
  } 

}