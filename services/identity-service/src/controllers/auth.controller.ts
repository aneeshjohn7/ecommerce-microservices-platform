import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { UserRepository } from '../repositories/user.repository';
import prisma from '../config/database';
import { RegisterDto } from '../dto/register.dto';
import { AppError } from '../errors/AppError';
import { LoginDto } from '../dto/login.dto';
import { RoleRepository } from '../repositories/role.repository';
import { UserRoleRepository } from '../repositories/userRole.repository';
import { RefreshTokenRepository } from '../repositories/refreshToken.repository';



export class AuthController {
  constructor(private authService: AuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body as RegisterDto;
    const user = await this.authService.register(userData);
    res.status(201).json(user);
  });
  /**
   * Handles email verification.
   * @param req - The request object containing the verification token.
   * @param res - The response object to send the result.
   */
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      throw new AppError('Invalid or missing token', 400);
    }
    await this.authService.verifyEmail(token);
    res.status(200).json({ message: 'Email verified successfully' });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginDto;
    const tokens = await this.authService.login(email, password);
    res.status(200).json(tokens);
  });
}
