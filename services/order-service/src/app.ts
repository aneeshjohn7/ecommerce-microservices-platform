import express from "express";
import orderRoutes from "./routes/order.routes";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "order-service ok" });
});

app.use("/api/v1/orders", orderRoutes);

export default app;