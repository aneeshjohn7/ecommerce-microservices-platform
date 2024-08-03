export const orderSchema = {
  Order: {
    type: 'object',
    properties: {
      customerId: { type: 'string' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: { type: 'string' },
            quantity: { type: 'integer' },
          },
          required: ['productId', 'quantity'],
        },
      },
      shippingAddress: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          province: { type: 'string' },
          postalCode: { type: 'string' },
          country: { type: 'string' },
        },
        required: ['street', 'city', 'province', 'postalCode', 'country'],
      },
    },
    required: ['customerId', 'items', 'shippingAddress'],
    additionalProperties: false,
  },
};
