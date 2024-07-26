import app from "./app";
import { connectRabbitMQ } from "./infrastructure/rabbitmq/connection";

const PORT = process.env.PORT || 3001;

async function startServer() {
  await connectRabbitMQ();

app.listen(PORT, () => {
  console.log(`Identity service running on port ${PORT}`);
});

}

startServer();