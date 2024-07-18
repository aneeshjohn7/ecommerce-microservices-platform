/* jsdoc
 * @file ConflictError.ts
 * @description This file defines a custom error class for handling conflict errors in the application.
 * @module errors/ConflictError
 */
import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409); // 409 is the HTTP status code for conflict
  }
}   