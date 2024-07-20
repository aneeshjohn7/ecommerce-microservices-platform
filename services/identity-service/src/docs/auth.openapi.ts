import { errorResponses } from "./errors.openapi"
export const authOpenApi = {
    "/api/v1/auth/register": {
        post: {
            summary: "Register a new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RegisterRequest"
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "User registered successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },
                "400": errorResponses.validationError,
                "409": errorResponses.conflictError,
                "500": errorResponses.internalServerError
            }
        }
    }
}