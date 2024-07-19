export const config = {
  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 12),
  },
  app: {
    apiUrl: process.env.API_URL ?? 'http://localhost:3001',
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
};
