import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { registerSchema } from '../schemas/auth.schema';
import { UserStatus } from "@prisma/client";
import { config } from '../config/env';


type RegisterDto = z.infer<typeof registerSchema>;

export class AuthService {
  // use dependency injection rather than creating an instance of user repository here. This will make it easier to test the service in isolation.
  constructor(private userRepository: UserRepository) {}

  async register(userData: RegisterDto) {
    const { firstName, lastName, email, password, phone } = userData;

    const saltRounds = config.bcrypt.saltRounds;
    const passwordHash = await bcrypt.hash(password, saltRounds);


    const user = await this.userRepository.create({ 
      email,
      firstName,
      lastName,
      phone,
      passwordHash,
      status: UserStatus.ACTIVE,
      emailVerified: false,
    });

    return user;
  }
}
