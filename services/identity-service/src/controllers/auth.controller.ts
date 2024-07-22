import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { UserRepository } from '../repositories/user.repository';
import prisma from '../config/database';
import { RegisterDto } from '../dto/register.dto';
import { AppError } from '../errors/AppError';
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
/**
 * Handles email verification.
 * @param req - The request object containing the verification token.
 * @param res - The response object to send the result.
 */
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    throw new AppError('Invalid or missing token', 400);
  }
  await authService.verifyEmail(token);
  res.status(200).json({ message: 'Email verified successfully' });
});
