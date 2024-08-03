import { getRabbitMQChannel } from "./connection";

export const Exchanges = {
  ORDER: "order.events",
};

export async function setupExchanges() {
  const channel = getRabbitMQChannel();

  await channel.assertExchange(
    Exchanges.ORDER,
    "topic",
    {
      durable: true,
    }
  );

  console.log(`RabbitMQ exchanges created: ${Exchanges.ORDER}`);
}