import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { InvalidTokenError } from '../errors/InvalidTokenError';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new InvalidTokenError('No token provided');
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], jwtConfig.secret);
    (req as any).user = decoded;
    next();
  } catch {
    throw new InvalidTokenError('Invalid token');
  }
};
