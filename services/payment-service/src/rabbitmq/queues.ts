import { getRabbitMQChannel } from "./connection";

export const Queues = {
  ORDER: "order.queue",
};

export async function setupQueues() {
  const channel = getRabbitMQChannel();

  await channel.assertQueue(Queues.ORDER, {
    durable: true,
  });

  console.log("RabbitMQ order queues created");
}