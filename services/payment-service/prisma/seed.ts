import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Payment Service...");

  //
  // Payment Methods
  //

  const visa = await prisma.paymentMethod.upsert({
    where: {
      token: "tok_visa_demo_001",
    },
    update: {},
    create: {
      userId: "11111111-1111-1111-1111-111111111111",
      provider: "Stripe",
      cardLast4: "4242",
      cardBrand: "Visa",
      token: "tok_visa_demo_001",
      isDefault: true,
    },
  });

  const mastercard = await prisma.paymentMethod.upsert({
    where: {
      token: "tok_master_demo_001",
    },
    update: {},
    create: {
      userId: "22222222-2222-2222-2222-222222222222",
      provider: "Stripe",
      cardLast4: "5555",
      cardBrand: "Mastercard",
      token: "tok_master_demo_001",
      isDefault: true,
    },
  });

  //
  // Payments
  //

  const payment1 = await prisma.payment.upsert({
    where: {
      transactionReference: "TXN-100001",
    },
    update: {},
    create: {
      orderId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      userId: "11111111-1111-1111-1111-111111111111",
      paymentMethodId: visa.id,
      amount: 1299.99,
      currency: "CAD",
      status: "SUCCESS",
      transactionReference: "TXN-100001",
      providerResponse: {
        provider: "Stripe",
        message: "Payment successful",
      },
    },
  });

  const payment2 = await prisma.payment.upsert({
    where: {
      transactionReference: "TXN-100002",
    },
    update: {},
    create: {
      orderId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      userId: "22222222-2222-2222-2222-222222222222",
      paymentMethodId: mastercard.id,
      amount: 89.99,
      currency: "CAD",
      status: "PENDING",
      transactionReference: "TXN-100002",
      providerResponse: {
        provider: "Stripe",
        message: "Awaiting confirmation",
      },
    },
  });

  //
  // Refund
  //

  await prisma.refund.upsert({
    where: {
      providerReference: "REF-100001",
    },
    update: {},
    create: {
      paymentId: payment1.id,
      amount: 50.0,
      reason: "Customer returned item",
      status: "COMPLETED",
      providerReference: "REF-100001",
    },
  });

  //
  // Payment Events
  //

  await prisma.paymentEvent.createMany({
    data: [
      {
        paymentId: payment1.id,
        eventType: "PAYMENT_COMPLETED",
        payload: {
          provider: "Stripe",
          status: "SUCCESS",
        },
        processed: true,
      },
      {
        paymentId: payment2.id,
        eventType: "PAYMENT_PENDING",
        payload: {
          provider: "Stripe",
          status: "PENDING",
        },
        processed: false,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Payment Service seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });