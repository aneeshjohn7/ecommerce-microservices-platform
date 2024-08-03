import app from "./app";
import { connectRabbitMQ } from "./rabbitmq/connection";
import { setupQueues } from "./rabbitmq/queues";
import { startConsumer } from "./rabbitmq/consumer";
import { setupBindings } from "./rabbitmq/bindings";

const PORT = process.env.PORT || 3004;


app.listen(PORT, async () => {

  await connectRabbitMQ();
  await setupQueues();
  await setupBindings();
  await startConsumer();
  
  console.log(
    `Payment service running on port ${PORT}`
  );

});