import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
/**
 * Handles user registration.
 * @param req - The request object containing user data.
 * @param res - The response object to send the result. 
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await AuthService.register(userData);
  res.status(201).json(user);
});