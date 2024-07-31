import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "../config/env";

const router = express.Router();

router.use(
  "/auth",
  createProxyMiddleware({
    target: config.services.identityServiceUrl,
    changeOrigin: true
  })
);

export default router;