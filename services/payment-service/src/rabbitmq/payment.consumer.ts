import { getRabbitMQChannel } from './connection';
import { PaymentService } from '../services/payment.service';
import { PaymentRepository } from '../repositories/payment.repository';
import { Queues } from './queues';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

      console.log('order created event received:', event);

      const paymentService = new PaymentService(new PaymentRepository(prisma));
      await paymentService.createPayment({
        orderId: event.orderId,
        userId: event.userId,
        amount: event.grandTotal,
        currency: 'CAD',
      });

      await paymentService.processPayment({
        orderId: event.orderId,
      });
      

      channel.ack(message);
    } catch (error) {
      console.error('Error processing message:', error);

      channel.nack(message, false, false);
    }
  });

  console.log(`Payment worker consuming from ${Queues.ORDER}`);
}
