import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { registerSchema } from '../schemas/auth.schema';
import { UserStatus } from "@prisma/client";
import { config } from '../config/env';
import crypto from 'crypto';
import { AppError } from '../errors/AppError';
import { publishUserRegistered } from '../infrastructure/rabbitmq/publisher';


type RegisterDto = z.infer<typeof registerSchema>;

export class AuthService {
  // use dependency injection rather than creating an instance of user repository here. This will make it easier to test the service in isolation.
  constructor(private userRepository: UserRepository) {}

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

    await publishUserRegistered({
      userId: user.id,
      email,
      verificationToken,
    });
    
    return user;
  }

  async verifyEmail(token: string) {
    const user = await this.userRepository.findByEmailVerificationToken(token);

    if (!user) {
      throw new AppError('Invalid token', 400);
    }

    if (user.emailVerificationExpiresAt && user.emailVerificationExpiresAt < new Date()) {
      throw new AppError('Token has expired', 400);
    }

    await this.userRepository.updateEmailVerificationStatus(user.id, true);
  } 
}
