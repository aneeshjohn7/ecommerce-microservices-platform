import app from "./app";
import { connectRabbitMQ } from "./infrastructure/rabbitmq/connection";
import { setupExchanges } from "./infrastructure/rabbitmq/exchanges"
import { setupQueues } from "./infrastructure/rabbitmq/queues"

const PORT = process.env.PORT || 3001;

async function startServer() {
  await connectRabbitMQ();
  await setupExchanges();
  await setupQueues();

app.listen(PORT, () => {
  console.log(`Identity service running on port ${PORT}`);
});

}

startServer();