import swaggerJsdoc from 'swagger-jsdoc';
import { config } from '../config/env';
import { authOpenApi } from './auth.openapi';
import { orderSchema } from './schemas/order.schema';
import { errorSchemas } from './schemas/errors.schema';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Service API',
      version: '1.0.0',
      description: 'Order APIs',
    },
    components: {
      schemas: {
        ...orderSchema,
        ...errorSchemas,
      },
    },
    paths: {
      ...authOpenApi,
    },
    servers: [
      {
        url: config.app.apiUrl || '/api/v1',
        description: 'API Server',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
