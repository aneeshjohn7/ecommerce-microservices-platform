import { getRabbitMQChannel } from "./connection";

export const Exchanges = {
  USER: "user.events",
};

export async function setupExchanges() {
  const channel = getRabbitMQChannel();

  await channel.assertExchange(
    Exchanges.USER,
    "topic",
    {
      durable: true,
    }
  );

  console.log("RabbitMQ exchanges created");
}