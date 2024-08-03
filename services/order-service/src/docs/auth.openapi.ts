import { errorResponses } from './errors.openapi';
export const authOpenApi = {
  '/api/v1/orders': {
    post: {
      summary: 'Create a new order',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/OrderRequest',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Order created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Order',
              },
            },
          },
        },
        '400': errorResponses.validationError,
        '409': errorResponses.conflictError,
        '500': errorResponses.internalServerError,
      },
    },
  },
};
