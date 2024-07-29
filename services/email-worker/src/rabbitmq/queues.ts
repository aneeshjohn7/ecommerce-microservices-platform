import { getRabbitMQChannel } from "./connection";

export const Queues = {
  EMAIL: "email.queue",
};

export async function setupQueues() {
  const channel = getRabbitMQChannel();

  await channel.assertQueue(Queues.EMAIL, {
    durable: true,
  });

  console.log("RabbitMQ queues created");
}