import type { SignOptions } from 'jsonwebtoken';
export const config = {
  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 12),
  },
  app: {
    apiUrl: process.env.API_URL ?? 'http://localhost:3003',
    nodeEnv: process.env.NODE_ENV ?? 'dev',
  },
}; 
 
