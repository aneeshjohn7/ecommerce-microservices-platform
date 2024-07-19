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
                "400": {
                    description: "Invalid input"
                }
            }
        }
    }
}