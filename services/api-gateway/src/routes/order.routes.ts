import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from '../config/env';

const router = express.Router();
console.log(config.services.orderServiceUrl );
router.use(
  '/',
  createProxyMiddleware({
    target: config.services.orderServiceUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/': '/api/v1/orders/',
    }
  }),
);

export default router;
