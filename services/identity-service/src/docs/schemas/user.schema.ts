export const userSchema = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string', nullable: true },
    },
    required: ['id', 'firstName', 'lastName', 'email'],
    additionalProperties: false,
  },
};
