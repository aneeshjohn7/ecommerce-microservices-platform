import { connectRabbitMQ } from "./rabbitmq/connection";
import { startConsumer } from "./rabbitmq/consumer";

async function bootstrap() {
  await connectRabbitMQ();

  await startConsumer();

  console.log("Email Worker Started");
}

bootstrap();