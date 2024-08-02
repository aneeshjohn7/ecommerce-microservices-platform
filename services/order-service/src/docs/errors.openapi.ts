import { errorSchemas } from "./schemas/errors.schema";
export const errorResponses = {
  validationError: {
    description: "Validation Error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ValidationError"
        }
      }
    }
  },

  conflictError: {
    description: "Email already exists",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ConflictError"
        }
      }
    }
  },

  internalServerError: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Error"
        }
      }
    }
  }
};