import app from './app';
import { connectRabbitMQ } from './infrastructure/rabbitmq/connection';
import { setupExchanges } from './infrastructure/rabbitmq/exchanges';


const PORT = process.env.PORT || 3001;

async function startServer() {
  await connectRabbitMQ();
  await setupExchanges();

  app.listen(PORT, () => {
    console.log(`Identity service running on port ${PORT}`);
  });
}

startServer();
