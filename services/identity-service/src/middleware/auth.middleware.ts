import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';
import jwt from 'jsonwebtoken';
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
    const decoded = jwt.verify(token.split(' ')[1], config.jwtConfig.accessTokenSecret);
    (req as any).user = decoded; 
    next();
  } catch {
    throw new InvalidTokenError('Invalid token');
  }
};
