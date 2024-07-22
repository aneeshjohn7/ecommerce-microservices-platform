import { AuthService } from '../../../src/services/auth.service';
import { UserRepository } from '../../../src/repositories/user.repository';
import bcrypt from 'bcrypt';
import { UserStatus } from '@prisma/client';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

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
    expect(userRepository.create).toHaveBeenCalledWith({
      email: registerData.email,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      phone: registerData.phone,
      passwordHash: hashedPassword,
      status: UserStatus.ACTIVE,
      emailVerified: false,
    });

    // Assert: service returns repository result
    expect(result).toEqual(createdUser);
  });
});

