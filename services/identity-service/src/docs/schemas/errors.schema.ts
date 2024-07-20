export const errorSchemas = {
  ValidationError: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Validation failed"
      },
      errors: {
        type: "array",
        items: {
          type: "object",
          properties: {
            code: {
              type: "string",
              example: "invalid_type"
            },
            path: {
              type: "array",
              items: {
                type: "string"
              },
              example: ["email"]
            },
            message: {
              type: "string",
              example: "Invalid email address"
            }
          }
        }
      }
    }
  },

  ConflictError: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Email already exists"
      }
    }
  },

  Error: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Internal server error"
      }
    }
  }
};