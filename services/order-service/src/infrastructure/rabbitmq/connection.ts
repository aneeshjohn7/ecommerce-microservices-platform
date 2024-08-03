import amqp, { ChannelModel, ConfirmChannel } from 'amqplib';
import { config } from '../../config/env';

let connection: ChannelModel;
let channel: ConfirmChannel;

export async function connectRabbitMQ() {
  connection = await amqp.connect(
    config.rabbitmq.url || 'amqp://rabbitmq:5672',
    {
      clientProperties: {
        connection_name: 'order-service',
      },
    },
  );

  channel = await connection.createConfirmChannel();

  console.log('Connected to RabbitMQ');

  return channel;
}

export function getRabbitMQChannel() {
  if (!channel) {
    throw new Error('RabbitMQ channel has not been initialized');
  }

  return channel;
}
