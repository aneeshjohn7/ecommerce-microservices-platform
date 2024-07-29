import { getRabbitMQChannel } from "./connection";
import { Exchanges } from "./exchanges";
import { Queues } from "./queues";
import { RoutingKeys } from "./routingKeys";

export async function setupBindings() {
  const channel = getRabbitMQChannel();

  await channel.bindQueue(
    Queues.EMAIL,
    Exchanges.USER,
    RoutingKeys.USER_REGISTERED
  );

  console.log("RabbitMQ bindings created");
}