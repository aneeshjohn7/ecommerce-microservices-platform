import express from "express";
import orderRoutes from "./modules/order/order.routes";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "order-service ok" });
});

app.use("/orders", orderRoutes);

export default app;