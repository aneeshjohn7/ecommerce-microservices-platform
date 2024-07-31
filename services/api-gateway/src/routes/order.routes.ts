import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "../config/env";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: config.services.orderServiceUrl,
    changeOrigin: true
  })
);

export default router;