import { getRabbitMQChannel } from './connection';
import { Queues } from './queues';
import { processMockPayment } from '../services/payment.service';

export async function startConsumer() {
  console.log('1. startConsumer() called');

  const channel = getRabbitMQChannel();

  console.log('2. Got RabbitMQ channel');
  console.log('3. Queue:', Queues.ORDER);

  await channel.consume(Queues.ORDER, async (message) => {
    console.log('4. consume callback executed');

    if (!message) {
      return;
    }

    try {
      const event = JSON.parse(message.content.toString());

      console.log('Order created event received:', event);

      const paymentResult = await processMockPayment(event);

      console.log('Mock payment result:', paymentResult);

      channel.ack(message);
    } catch (error) {
      console.error('Error processing message:', error);

      channel.nack(message, false, false);
    }
  });

  console.log(`Payment service consuming from ${Queues.ORDER}`);
}
