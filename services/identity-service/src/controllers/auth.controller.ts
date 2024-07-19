import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { UserRepository } from '../repositories/user.repository';
import prisma from '../config/database';
import { RegisterDto } from '../dto/register.dto';
/**
 * Handles user registration.
 * @param req - The request object containing user data.
 * @param res - The response object to send the result.
 */
const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);

export const register = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body as RegisterDto;
  const user = await authService.register(userData);
  res.status(201).json(user);
});
