import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  console.log("🌱 Seeding Identity Service...");

  //
  // Roles
  //

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "System Administrator",
    },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: "CUSTOMER" },
    update: {},
    create: {
      name: "CUSTOMER",
      description: "Customer",
    },
  });

  //
  // Permissions
  //

  const permissions = [
    "USER_READ",
    "USER_CREATE",
    "USER_UPDATE",
    "USER_DELETE",

    "ROLE_READ",
    "ROLE_CREATE",
    "ROLE_UPDATE",
    "ROLE_DELETE",

    "PRODUCT_READ",
    "PRODUCT_CREATE",
    "PRODUCT_UPDATE",
    "PRODUCT_DELETE",

    "ORDER_READ",
    "ORDER_CREATE",
    "ORDER_UPDATE",
    "ORDER_DELETE",

    "PAYMENT_READ",
    "PAYMENT_CREATE",
    "PAYMENT_UPDATE",
    "PAYMENT_DELETE",
  ];

  const createdPermissions = [];

  for (const permission of permissions) {

    const p = await prisma.permission.upsert({
      where: {
        name: permission,
      },
      update: {},
      create: {
        name: permission,
      },
    });

    createdPermissions.push(p);
  }

  //
  // Assign all permissions to ADMIN
  //

  for (const permission of createdPermissions) {

    await prisma.rolePermission.upsert({

      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },

      update: {},

      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  //
  // Admin User
  //

  const passwordHash = await bcrypt.hash("Admin@123", 12);

  const admin = await prisma.user.upsert({

    where: {
      email: "admin@example.com",
    },

    update: {},

    create: {

      email: "admin@example.com",

      passwordHash,

      isActive: true,

      emailVerified: true,

      roleId: adminRole.id,
    },
  });

  //
  // Profile
  //

  await prisma.userProfile.upsert({

    where: {
      userId: admin.id,
    },

    update: {},

    create: {

      userId: admin.id,

      firstName: "System",

      lastName: "Administrator",
    },
  });

  console.log("✅ Identity Service Seed Complete");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });