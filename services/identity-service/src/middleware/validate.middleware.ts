import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodType) {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({
        message: "Validation failed",
        errors: result.error.issues
      });
    }

    // Replace raw input with validated data
    req.body = result.data;

    next();
  };
}