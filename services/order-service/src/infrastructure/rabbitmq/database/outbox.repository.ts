import prisma from "../../../config/prisma";

export async function fetchOutboxEvents() {
  return prisma.orderEvent.findMany({
    where: { processed: false },
    take: 100,
    orderBy: { createdAt: "asc" },
  });
}

export async function markEventAsProcessed(eventId: string) {
  return prisma.orderEvent.update({
    where: { id: eventId },
    data: { processed: true },
  });
}