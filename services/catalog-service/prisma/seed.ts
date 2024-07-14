import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Catalog Service...");

  // =========================================================
  // CATEGORIES
  // =========================================================

  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and accessories",
    },
  });

  const clothing = await prisma.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: {
      name: "Clothing",
      slug: "clothing",
      description: "Fashion and apparel",
    },
  });

  const smartphones = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: {
      parentId: electronics.id,
      name: "Smartphones",
      slug: "smartphones",
      description: "Mobile phones and accessories",
    },
  });

  // =========================================================
  // PRODUCTS
  // =========================================================

  const iphone = await prisma.product.upsert({
    where: { sku: "APL-IP15-128-BLK" },
    update: {},
    create: {
      categoryId: smartphones.id,
      sku: "APL-IP15-128-BLK",
      name: "iPhone 15",
      slug: "iphone-15",
      description: "Apple iPhone 15 128GB Black",
      price: 999.99,
      status: "ACTIVE",
    },
  });

  const galaxy = await prisma.product.upsert({
    where: { sku: "SAM-S24-256-GRY" },
    update: {},
    create: {
      categoryId: smartphones.id,
      sku: "SAM-S24-256-GRY",
      name: "Samsung Galaxy S24",
      slug: "samsung-galaxy-s24",
      description: "Samsung flagship smartphone",
      price: 949.99,
      status: "ACTIVE",
    },
  });

  const tshirt = await prisma.product.upsert({
    where: { sku: "NIK-TEE-BLK-L" },
    update: {},
    create: {
      categoryId: clothing.id,
      sku: "NIK-TEE-BLK-L",
      name: "Nike Sports T-Shirt",
      slug: "nike-sports-tshirt",
      description: "Premium cotton sports t-shirt",
      price: 39.99,
      status: "ACTIVE",
    },
  });

  // =========================================================
  // PRODUCT IMAGES
  // =========================================================

  await prisma.productImage.createMany({
    data: [
      {
        productId: iphone.id,
        imageUrl: "https://example.com/images/iphone15-front.jpg",
        sortOrder: 1,
      },
      {
        productId: iphone.id,
        imageUrl: "https://example.com/images/iphone15-back.jpg",
        sortOrder: 2,
      },
      {
        productId: galaxy.id,
        imageUrl: "https://example.com/images/galaxys24-front.jpg",
        sortOrder: 1,
      },
      {
        productId: tshirt.id,
        imageUrl: "https://example.com/images/nike-shirt.jpg",
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  // =========================================================
  // PRODUCT ATTRIBUTES
  // =========================================================

  await prisma.productAttribute.createMany({
    data: [
      {
        productId: iphone.id,
        attributeName: "Storage",
        attributeValue: "128GB",
      },
      {
        productId: iphone.id,
        attributeName: "Color",
        attributeValue: "Black",
      },
      {
        productId: galaxy.id,
        attributeName: "Storage",
        attributeValue: "256GB",
      },
      {
        productId: galaxy.id,
        attributeName: "Color",
        attributeValue: "Gray",
      },
      {
        productId: tshirt.id,
        attributeName: "Size",
        attributeValue: "Large",
      },
      {
        productId: tshirt.id,
        attributeName: "Color",
        attributeValue: "Black",
      },
    ],
    skipDuplicates: true,
  });

  // =========================================================
  // INVENTORY
  // =========================================================

  await prisma.inventory.upsert({
    where: { productId: iphone.id },
    update: {},
    create: {
      productId: iphone.id,
      quantity: 100,
      reservedQuantity: 5,
      warehouseLocation: "WH-A1",
    },
  });

  await prisma.inventory.upsert({
    where: { productId: galaxy.id },
    update: {},
    create: {
      productId: galaxy.id,
      quantity: 80,
      reservedQuantity: 3,
      warehouseLocation: "WH-A2",
    },
  });

  await prisma.inventory.upsert({
    where: { productId: tshirt.id },
    update: {},
    create: {
      productId: tshirt.id,
      quantity: 250,
      reservedQuantity: 10,
      warehouseLocation: "WH-B1",
    },
  });

  // =========================================================
  // PRODUCT REVIEWS
  // =========================================================

  await prisma.productReview.createMany({
    data: [
      {
        productId: iphone.id,
        userId: "11111111-1111-1111-1111-111111111111",
        rating: 5,
        review: "Excellent phone with great battery life.",
      },
      {
        productId: iphone.id,
        userId: "22222222-2222-2222-2222-222222222222",
        rating: 4,
        review: "Very good overall experience.",
      },
      {
        productId: galaxy.id,
        userId: "33333333-3333-3333-3333-333333333333",
        rating: 5,
        review: "Amazing display and performance.",
      },
      {
        productId: tshirt.id,
        userId: "44444444-4444-4444-4444-444444444444",
        rating: 4,
        review: "Comfortable and good quality fabric.",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Catalog Service Seed Complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });