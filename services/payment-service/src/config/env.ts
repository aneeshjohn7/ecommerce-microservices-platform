export const config = {
  app: {
    apiUrl: process.env.API_URL ?? 'http://localhost:3004',
    nodeEnv: process.env.NODE_ENV ?? 'dev',
  },
  rabbitmq: {
    enable: process.env.ENABLE_RABBITMQ === 'true',
    url: process.env.RABBITMQ_URL ?? 'amqp://rabbitmq:5672',
  },
};
