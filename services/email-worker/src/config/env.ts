export const config = {
  app: {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    baseUrl: process.env.APP_BASE_URL ?? 'http://localhost:3005',
    verificationBaseUrl: process.env.VERIFICATION_BASE_URL ?? 'http://localhost:3001',
  },
  
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? 'amqp://rabbitmq:5672',
  },
  email: {
    from: process.env.EMAIL_FROM ?? 'aneesh85@gmail.com',
  },
  smtp: {
    host: process.env.SMTP_HOST ?? 'email-smtp.ca-central-1.amazonaws.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true' || false,
    user: process.env.SMTP_USER ?? '',
    password: process.env.SMTP_PASSWORD ?? '',
  },
};
