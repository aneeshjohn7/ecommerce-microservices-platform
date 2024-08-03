
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/ValidationError";

const productIdSchema = z.string().uuid();

export function validateProductId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = productIdSchema.safeParse(req.params.productId);

  if (!result.success) {
    throw new ValidationError(
      "Invalid product ID",
      result.error.issues
    );
  }

  next();
}
