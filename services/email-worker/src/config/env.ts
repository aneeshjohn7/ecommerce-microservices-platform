export const config = {
  app: {
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? 'amqp://rabbitmq:5672',
  },
};
