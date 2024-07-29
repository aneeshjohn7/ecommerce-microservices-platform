import { getRabbitMQChannel } from './connection';
import { Queues } from './queues';

export async function startConsumer() {
  console.log('1. startConsumer() called');

  const channel = getRabbitMQChannel();

  console.log('2. Got RabbitMQ channel');
  console.log('3. Queue:', Queues.EMAIL);

  await channel.consume(Queues.EMAIL, async (message) => {
    console.log('4. consume callback executed');

    if (!message) {
      return;
    }

    try {
      const event = JSON.parse(message.content.toString());

      console.log('UserRegistered event received:', event);

      // Send verification email here
      // await sendVerificationEmail(event);

      channel.ack(message);
    } catch (error) {
      console.error('Error processing message:', error);

      channel.nack(message, false, false);
    }
  });

  console.log(`Email worker consuming from ${Queues.EMAIL}`);
}
