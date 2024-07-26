import { PrismaClient, User, Prisma } from '@prisma/client';
import { ConflictError } from '../errors/ConflictError';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}
  /**
   * Create a new user in the database.
   * @param data - The user data to create.
   * @returns The created user.
   * @throws Error if a user with the same email already exists.
   * Omits the passwordHash, emailVerificationToken, and emailVerificationExpiresAt fields from the returned user object using prisma omit.
   */
  async create(
    data: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'passwordHash' | 'emailVerificationToken' | 'emailVerificationExpiresAt'>> {
    try {
      return await this.prisma.user.create({
        data,
        omit: {
          passwordHash: true,
          emailVerificationToken: true,
          emailVerificationExpiresAt: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const target = error.meta?.target as string[] | undefined;
        if (error.code === 'P2002' && target?.includes('email')) {
          throw new ConflictError('User with this email already exists'); 
        }
      }
      throw error;
    }
  }
  /**
   * Find a user by their ID.
   * @param id - The ID of the user to find.
   * @returns The user if found, otherwise null.
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find a user by their email.
   * @param email - The email of the user to find.
   * @returns The user if found, otherwise null.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Update a user's password.
   * @param id - The ID of the user.
   * @param passwordHash - The new password hash.
   * @returns The updated user.
   */
  async updatePassword(id: string, passwordHash: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { passwordHash },
    });
  }

  /**
   * Delete a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns The deleted user.
   */
  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Check if a user exists by their email.
   * @param email - The email of the user to check.
   * @returns True if the user exists, otherwise false.
   */
  async exists(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email },
    });
    return count > 0;
  }

  /**
   * List all users.
   * @returns An array of users.
   */
  async list(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
  /**
   * Find a user by their email verification token.
   * @param token - The email verification token.
   * @returns The user if found, otherwise null.
   */
  async findByEmailVerificationToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });
  }

  /**
   * Update a user's email verification status.
   * @param id - The ID of the user.
   * @param emailVerified - The new email verification status.
   * @returns The updated user.
   */
  async updateEmailVerificationStatus(id: string, emailVerified: boolean): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { emailVerified, emailVerificationToken: null, emailVerificationExpiresAt: null },
    });
  }
}
