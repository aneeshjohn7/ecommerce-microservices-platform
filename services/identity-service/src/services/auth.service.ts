import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { registerSchema } from '../schemas/auth.schema';
import prisma from '../config/database';

type RegisterDto = z.infer<typeof registerSchema>;

export class AuthService {
  static async register(userData: RegisterDto) {
    const userRepository = new UserRepository(prisma);

    const { firstName, lastName, email, password } = userData;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await userRepository.create({
      email,
      firstName,
      lastName,
      phone: null,
      passwordHash,
      status: 'active',
      emailVerified: false,
    });

    return user;
  }
}
