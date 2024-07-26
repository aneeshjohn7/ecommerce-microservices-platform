// infrastructure/rabbitmq/publisher.ts

import { getRabbitMQChannel } from "./connection";
import { Exchanges } from "./exchanges";
import { RoutingKeys } from "./bindings";

export async function publishUserRegistered(data: {
  userId: string;
  email: string;
  verificationToken: string;
}) {
  const channel = getRabbitMQChannel();

  channel.publish(
    Exchanges.USER,
    RoutingKeys.USER_REGISTERED,
    Buffer.from(JSON.stringify(data)),
    {
      persistent: true,
    }
  );
}