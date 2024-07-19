export const registerRequestSchema = {
  RegisterRequest: {
    type: "object",
    required: ["firstName", "lastName", "email", "password"],
    properties: {
      firstName: {
        type: "string",
        example: "John",
      },
      lastName: {
        type: "string",
        example: "Smith",
      },
      email: {
        type: "string",
        format: "email",
        example: "john@example.com",
      },
      password: {
        type: "string",
        format: "password",
        minLength: 8,
        example: "P@ssw0rd123",
      },
      phone: {
        type: "string",
        nullable: true,
        example: "+15195551234",
      },
    },
    additionalProperties: false,
  },
};