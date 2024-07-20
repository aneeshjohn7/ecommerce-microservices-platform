import request from 'supertest';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { afterAll, describe, it, expect, beforeEach } from '@jest/globals';

import app from '../../../src/app';

const prisma = new PrismaClient();

describe('POST /api/v1/auth/register', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should register a new user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password: 'Password123!',
      phone: '4165551234',
    };

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(userData);

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      status: 'ACTIVE',
      emailVerified: false,
    });

    expect(response.body.passwordHash).toBeUndefined();

    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    expect(user).not.toBeNull();

    expect(user?.firstName).toBe(userData.firstName);
    expect(user?.lastName).toBe(userData.lastName);
    expect(user?.email).toBe(userData.email);
    expect(user?.phone).toBe(userData.phone);
    expect(user?.status).toBe('ACTIVE');
    expect(user?.emailVerified).toBe(false);

    expect(user?.passwordHash).not.toBe(userData.password);

    const passwordMatches = await bcrypt.compare(
      userData.password,
      user!.passwordHash,
    );

    expect(passwordMatches).toBe(true);
  });
});
function beforeAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}

