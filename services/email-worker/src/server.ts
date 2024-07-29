import { connectRabbitMQ } from "./rabbitmq/connection";
import { setupQueues } from "./rabbitmq/queues";
import { startConsumer } from "./rabbitmq/consumer";
import { setupBindings } from "./rabbitmq/bindings";

async function bootstrap() {
  await connectRabbitMQ();
  await setupQueues();
  await setupBindings();
  await startConsumer();

  console.log("Email Worker Started");
}

bootstrap();