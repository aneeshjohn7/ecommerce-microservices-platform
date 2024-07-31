export const config = {
  app: {
    apiUrl: process.env.API_URL ?? 'http://localhost:3001',
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  services: {
    identityServiceUrl: process.env.IDENTITY_SERVICE_URL ?? 'http://identity-service:3001',
    catalogServiceUrl: process.env.CATALOG_SERVICE_URL ?? 'http://catalog-service:3002',
    orderServiceUrl: process.env.ORDER_SERVICE_URL ?? 'http://order-service:3003',
    paymentServiceUrl: process.env.PAYMENT_SERVICE_URL ?? 'http://payment-service:3004',
  },
};
