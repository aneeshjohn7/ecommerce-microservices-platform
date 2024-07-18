/* jsdoc
 * @file BadRequestError.ts
 * @description This file defines a custom error class for handling bad request errors in the application.
 * @module errors/BadRequestError
 */ 
import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, 400); // 400 is the HTTP status code for bad request
  }
}