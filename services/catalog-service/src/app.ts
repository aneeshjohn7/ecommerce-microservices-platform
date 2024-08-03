import express from "express";
import catalogRoutes from "./routes/catalog.routes";
import { errorHandler } from './middleware/error.middleware';

const app = express();


app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "catalog-service ok" });
});

app.use("/api/v1/products", catalogRoutes);

app.use(errorHandler);

export default app;