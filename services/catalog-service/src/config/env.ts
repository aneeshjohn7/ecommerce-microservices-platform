export const config = {
  app: {
    apiUrl: process.env.API_URL ?? 'http://localhost:3002',
    nodeEnv: process.env.NODE_ENV ?? 'dev',
  },
};
