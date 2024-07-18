/* jsdoc
 * @file AppError.ts
 * @description This file defines a custom error class for handling application-specific errors.
 * @module errors/AppError
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
