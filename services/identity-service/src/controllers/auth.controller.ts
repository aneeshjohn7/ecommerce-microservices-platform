import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { UserRepository } from '../repositories/user.repository';
import prisma from '../config/database';
/**
 * Handles user registration.
 * @param req - The request object containing user data.
 * @param res - The response object to send the result. 
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;
  // create an instance of the auth service and call the register method using that instance
  const authService = new AuthService(new UserRepository(prisma));
  const user = await authService.register(userData);
  res.status(201).json(user);
});