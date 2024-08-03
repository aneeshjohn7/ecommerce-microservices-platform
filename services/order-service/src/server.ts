import app from './app';
import { connectRabbitMQ } from './infrastructure/rabbitmq/connection';
import { setupExchanges } from './infrastructure/rabbitmq/exchanges';
import { startOutboxWorker } from "./workers/outbox.runner";


const PORT = process.env.PORT || 3003;
async function startServer() {

  if (process.env.ENABLE_RABBITMQ === 'true') {
    await connectRabbitMQ();
    await setupExchanges();
  }
startOutboxWorker();  
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
}

startServer();
