import swaggerJsdoc from 'swagger-jsdoc';
import { config } from '../config/env';
import { authOpenApi } from './auth.openapi';
import { userSchema } from './schemas/user.schema';
import { registerRequestSchema } from './schemas/register-request.schema';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Identity Service API',
      version: '1.0.0',
      description: 'Authentication and user management APIs',
    },
    components: {
      schemas: {
        ...registerRequestSchema,
        ...userSchema,
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
