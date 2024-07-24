import { AuthService } from '../../../src/services/auth.service';
import { UserRepository } from '../../../src/repositories/user.repository';
import bcrypt from 'bcrypt';
import { UserStatus } from '@prisma/client';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { de } from 'zod/v4/locales';

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn<() => Promise<string>>(),
}));

describe('AuthService.register', () => {
  type UserRepositoryMock = {
    create: jest.MockedFunction<UserRepository['create']>;
  };

  let authService: AuthService;
  let userRepository: UserRepositoryMock;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
    };

    authService = new AuthService(userRepository as unknown as UserRepository);

    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const registerData = {
      firstName: 'Aneesh',
      lastName: 'John',
      email: 'aneesh@test.com',
      password: 'password123',
      phone: '1234567890',
    };

    // Arrange: mock bcrypt.hash()
    const hashedPassword = 'hashed_password';

    const hashMock = bcrypt.hash as unknown as jest.MockedFunction<
      (password: string, saltRounds: number) => Promise<string>
    >;

    hashMock.mockResolvedValue(hashedPassword);

    // Arrange: mock repository response
    const createdUser = {
      id: '1',
      email: registerData.email,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      phone: registerData.phone,
      status: UserStatus.ACTIVE,
      emailVerified: false,
      emailVerificationToken: null,
      emailVerificationExpiresAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.create.mockResolvedValue(createdUser);

    // Act
    const result = await authService.register(registerData);

    // Assert: bcrypt was called correctly
    expect(hashMock).toHaveBeenCalledWith(
      registerData.password,
      expect.any(Number),
    );

    // Assert: repository was called correctly
    expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      email: registerData.email,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      phone: registerData.phone,
      passwordHash: hashedPassword,
      status: UserStatus.ACTIVE,
      emailVerified: false,
      emailVerificationToken: expect.any(String),
      emailVerificationExpiresAt: expect.any(Date),
    }));

    // Assert: service returns repository result
    expect(result).toEqual(createdUser);
  });
});

describe('AuthService.verifyEmail', () => {
  type UserRepositoryMock = {
    findByEmailVerificationToken: jest.MockedFunction<
      UserRepository['findByEmailVerificationToken']
    >;

    updateEmailVerificationStatus: jest.MockedFunction<
      UserRepository['updateEmailVerificationStatus']
    >;
  };
  let userRepository: UserRepositoryMock;
  let authService: AuthService;

  beforeEach(() => {
    userRepository = {
      findByEmailVerificationToken: jest.fn(),
      updateEmailVerificationStatus: jest.fn(),
    };

    authService = new AuthService(userRepository as unknown as UserRepository);
  });

    it('should verify email with a valid token', async () => {
      // Arrange
      const user = {
        id: 'user-123',
        emailVerificationExpiresAt: new Date(Date.now() + 60_000),
      };

      userRepository.findByEmailVerificationToken.mockResolvedValue(
        user as any,
      );

      // Act
      await authService.verifyEmail('valid-token');

      // Assert
      expect(userRepository.findByEmailVerificationToken).toHaveBeenCalledWith(
        'valid-token',
      );

      expect(userRepository.updateEmailVerificationStatus).toHaveBeenCalledWith(
        'user-123',
        true,
      );
    });

    it('should throw an error when token is invalid', async () => {
      // Arrange
      userRepository.findByEmailVerificationToken.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.verifyEmail('invalid-token')).rejects.toThrow(
        'Invalid token',
      );

      expect(
        userRepository.updateEmailVerificationStatus,
      ).not.toHaveBeenCalled();
    });

    it('should throw an error when token has expired', async () => {
      // Arrange
      const user = {
        id: 'user-123',
        emailVerificationExpiresAt: new Date(Date.now() - 60_000),
      };

      userRepository.findByEmailVerificationToken.mockResolvedValue(
        user as any,
      );

      // Act & Assert
      await expect(authService.verifyEmail('expired-token')).rejects.toThrow(
        'Token has expired',
      );

      expect(
        userRepository.updateEmailVerificationStatus,
      ).not.toHaveBeenCalled();
    });

    it('should verify email when expiration date is null', async () => {
      // Arrange
      const user = {
        id: 'user-123',
        emailVerificationExpiresAt: null,
      };

      userRepository.findByEmailVerificationToken.mockResolvedValue(
        user as any,
      );

      // Act
      await authService.verifyEmail('valid-token');

      // Assert
      expect(userRepository.updateEmailVerificationStatus).toHaveBeenCalledWith(
        'user-123',
        true,
      );
    });
  });

