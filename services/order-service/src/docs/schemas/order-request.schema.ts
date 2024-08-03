export const orderRequestSchema = {
  OrderRequest: {
    type: "object",
    required: ["customerId", "items", "shippingAddress"],
    properties: {
      customerId: {
        type: "string",
        example: "user-123",
      },
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            productId: { type: "string", example: "product-456" },
            quantity: { type: "integer", example: 2 },
          },
          required: ["productId", "quantity"],
        },
      },
      shippingAddress: {
        type: "object",
        properties: {
          name: { type: "string", example: "Aneesh John" },
          phone: { type: "string", example: "1234567890" },
          address: { type: "string", example: "123 Main St" },
          city: { type: "string", example: "Anytown" },
          province: { type: "string", example: "CA" },
          postalCode: { type: "string", example: "12345" },
          country: { type: "string", example: "USA" },
        },
        required: ["name", "phone", "street", "city", "province", "postalCode", "country"],
      },
    },
    additionalProperties: false,
  },
};