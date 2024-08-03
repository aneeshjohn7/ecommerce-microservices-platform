import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../errors/ValidationError';

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError('Validation failed', result.error.issues);
    }

    // Replace raw input with validated data
    req.body = result.data;

    next();
  };
}
