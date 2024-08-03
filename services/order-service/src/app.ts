import express from "express";
import orderRoutes from "./routes/order.routes";
import { errorHandler } from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "order-service ok" });
});

app.use("/api/v1/orders", orderRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;