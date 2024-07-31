import { PrismaClient, UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Identity Service...');

  const users = [
    {
      email: 'admin@example.com',
      password: 'Admin@123',
      firstName: 'A',
      lastName: 'J',
      status: 'ACTIVE',
      email_verified: true,
    },
  ];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 12);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        passwordHash,
        firstName: user.firstName,
        lastName: user.lastName,
        status: UserStatus.ACTIVE,
        emailVerified: true,
      },
    });
  }

  const roles = [
    { name: 'ADMIN' },
    { name: 'USER' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
      },
    });
  } 

  // create seed for user_roles table
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (adminUser) {
    const adminRole = await prisma.role.findUnique({
      where: { name: 'ADMIN' },
    });

    if (adminRole) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: adminUser.id,
            roleId: adminRole.id,
          },
        },
        update: {},
        create: {
          userId: adminUser.id,
          roleId: adminRole.id,
        },
      });
    }
  }

  // creat seed for permissions table
  const permissions = [
    { name: 'CREATE_USER' },
    { name: 'READ_USER' },
    { name: 'UPDATE_USER' },
    { name: 'DELETE_USER' },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: {
        name: permission.name,
      },
    });
  }

  // create seed for role_permissions table
  const adminRole = await prisma.role.findUnique({
    where: { name: 'ADMIN' },
  });

  if (adminRole) {
    for (const permission of permissions) {
      const perm = await prisma.permission.findUnique({
        where: { name: permission.name },
      });

      if (perm) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: adminRole.id,
              permissionId: perm.id,
            },
          },
          update: {},
          create: {
            roleId: adminRole.id,
            permissionId: perm.id,
          },
        });
      }
    }
  }

  console.log('✅ Identity Service Seed Complete');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
