import type { SignOptions } from 'jsonwebtoken';
export const config = {
  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 12),
  },
  app: {
    apiUrl: process.env.API_URL ?? 'http://localhost:3001',
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  rabbitmq: {
    enable: process.env.ENABLE_RABBITMQ === 'true',
    url: process.env.RABBITMQ_URL ?? 'amqp://rabbitmq:5672', 
  },
  jwtConfig: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET!,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET!,
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'] ?? '1h', 
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] ?? '7d',
  }
};
