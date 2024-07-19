import { AppError } from "./AppError";

/* jsdoc
 * @file InvalidTokenError.ts
 * @description This file defines a custom error class for handling invalid or non-existent token errors in the application.
 * @module errors/InvalidTokenError
 */
export class InvalidTokenError extends AppError {
  constructor(message: string = "Invalid or non-existent token") {
    super(message, 401); // 401 is the HTTP status code for unauthorized access
  }
}   