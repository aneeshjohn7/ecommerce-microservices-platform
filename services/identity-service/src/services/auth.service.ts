import { UserRepository } from '../repositories/user.repository';
import { RoleRepository } from '../repositories/role.repository';
import { UserRoleRepository } from '../repositories/userRole.repository';
import { RefreshTokenRepository } from '../repositories/refreshToken.repository';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { registerSchema } from '../schemas/auth.schema';
import { UserStatus } from '@prisma/client';
import { config } from '../config/env';
import crypto from 'crypto';
import { AppError } from '../errors/AppError';
import { publishUserRegistered } from '../infrastructure/rabbitmq/publisher';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

type RegisterDto = z.infer<typeof registerSchema>;

export class AuthService {
  // use dependency injection rather than creating an instance of user repository here. This will make it easier to test the service in isolation.
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private userRoleRepository: UserRoleRepository,
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async register(userData: RegisterDto) {
    const { firstName, lastName, email, password, phone } = userData;

    const saltRounds = config.bcrypt.saltRounds;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await this.userRepository.create({
      email,
      firstName,
      lastName,
      phone,
      passwordHash,
      status: UserStatus.ACTIVE,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    });

    const role = await this.roleRepository.findByName('USER');
    if (role) {
      await this.userRoleRepository.assignRoleToUser(user.id, role.id);
    }

    await publishUserRegistered({
      userId: user.id,
      email,
      verificationToken,
      publishedAt: new Date().toISOString(),
    });

    return user;
  }

  async verifyEmail(token: string) {
    const user = await this.userRepository.findByEmailVerificationToken(token);

    if (!user) {
      throw new AppError('Invalid token', 400);
    }

    if (
      user.emailVerificationExpiresAt &&
      user.emailVerificationExpiresAt < new Date()
    ) {
      throw new AppError('Token has expired', 400);
    }

    await this.userRepository.updateEmailVerificationStatus(user.id, true);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }
    if (user.status !== UserStatus.ACTIVE) {
      throw new AppError('User account is not active', 403);
    }
    if (!user.emailVerified) {
      throw new AppError('Email not verified', 403);
    }
    const roles = await this.userRoleRepository.findRolesByUserId(user.id);
    const roleNames = roles.map((role) => role.role.name);
    const accessToken = generateAccessToken({ userId: user.id, roles: roleNames });
    const refreshToken = generateRefreshToken({ userId: user.id, roles: roleNames });
    // save refresh token in database
    await this.refreshTokenRepository.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
