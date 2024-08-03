import { getRabbitMQChannel } from "./connection";
import { Exchanges } from "./exchanges";
import { Queues } from "./queues";
import { RoutingKeys } from "./routingKeys";

export async function setupBindings() {
  const channel = getRabbitMQChannel();

  await channel.bindQueue(
    Queues.ORDER,
    Exchanges.USER,
    RoutingKeys.ORDER_CREATED
  );

  console.log("RabbitMQ bindings created");
}