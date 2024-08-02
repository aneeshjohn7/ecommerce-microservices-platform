import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticate } from '../middleware/auth.middleware';
import { config } from '../config/env';

const router = express.Router();

// Public endpoints
router.post(
  '/login',
  createProxyMiddleware({
    target: config.services.identityServiceUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/': '/api/v1/auth/',
    },
  }),
);

// Protected endpoints
router.use(
  '/',
  authenticate,
  createProxyMiddleware({
    target: config.services.identityServiceUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/': '/api/v1/auth/',
    },
  }),
);

export default router;
