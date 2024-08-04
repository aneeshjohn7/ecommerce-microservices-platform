import { AppError } from "./AppError";

/* jsdoc
 * @file ValidationError.ts
 * @description This file defines a custom error class for handling validation errors in the application.
 * @module errors/ValidationError
 */
export class ValidationError extends AppError {
  constructor(message: string, errors: object[] = []) {
    super(message, 422, errors); // 422 is the HTTP status code for unprocessable entity
  }
}   