import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "identity-service oks" });
});

app.use("/auth", authRoutes);

export default app;