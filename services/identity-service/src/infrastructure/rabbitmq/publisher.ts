import { getRabbitMQChannel } from "./connection";
import { Exchanges } from "./exchanges";
import { RoutingKeys } from "./routingKeys";

export async function publishUserRegistered(event: {
  userId: string;
  email: string;
  verificationToken: string;
  publishedAt: string;
}) {
  const channel = getRabbitMQChannel();

  const message = Buffer.from(JSON.stringify(event));
  console.log("About to publish UserRegistered event");
  const published = channel.publish(
    Exchanges.USER,
    RoutingKeys.USER_REGISTERED,
    message,
    {
      persistent: true,
      contentType: "application/json",
    }
  );

  console.log("UserRegistered event published", published);
}