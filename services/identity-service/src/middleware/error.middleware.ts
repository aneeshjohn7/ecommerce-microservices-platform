import e, { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';
import { config } from '../config/env';

/**
 * Global error handler middleware.
 * @param err - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('ERROR:', err);
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ message: err.message, errors: err.errors });
  }
  const isDevelopment =  config.app.nodeEnv === 'development';

  return res.status(500).json({
    message: isDevelopment ? err.message : 'Internal Server Error',

    ...(isDevelopment && {
      stack: err.stack,
    }),
    
  });
};
