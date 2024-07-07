import express from "express";

import paymentRoutes from "./modules/payment/payment.routes";


const app = express();


app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "payment-service ok" });
});

app.use("/payments", paymentRoutes);


export default app;