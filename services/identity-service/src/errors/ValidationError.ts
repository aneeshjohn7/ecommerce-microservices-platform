// create validateError.ts file by exntending the AppError class and setting the status code to 422 (Unprocessable Entity)
import { AppError } from "./AppError";

/* jsdoc
 * @file ValidationError.ts
 * @description This file defines a custom error class for handling validation errors in the application.
 * @module errors/ValidationError
 */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 422); // 422 is the HTTP status code for unprocessable entity
  }
}   