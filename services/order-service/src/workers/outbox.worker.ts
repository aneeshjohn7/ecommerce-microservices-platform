import { getRabbitMQChannel } from '../infrastructure/rabbitmq/connection';
import { Exchanges } from '../infrastructure/rabbitmq/exchanges';
import { fetchOutboxEvents, markEventAsProcessed } from '../infrastructure/rabbitmq/database/outbox.repository';
import { RoutingKeys } from '../infrastructure/rabbitmq/routingKeys';
export async function processOutboxEvents() {
  const channel = getRabbitMQChannel();
  // Fetch outbox events from the database
  const outboxEvents = await fetchOutboxEvents();
  for (const event of outboxEvents) {
    try {
      // Publish the event to RabbitMQ
      const message = Buffer.from(JSON.stringify(event.payload));
      const published = channel.publish(
        Exchanges.ORDER,
        RoutingKeys.ORDER_CREATED,
        message,
        { persistent: true, contentType: 'application/json' },
        (err) => {
          if (err) {
            console.error('Message not confirmed', err);
          } else {
            console.log('RabbitMQ confirmed the message');
            markEventAsProcessed(event.id);
          }
        },
      );
      console.log('Outbox event published', published);
    } catch (error) {
      console.error('Failed to publish outbox event', error);
    }
  }
}
