import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
const app = express();

app.use(express.json());


app.get("/health", (req, res) => {
  res.json({ status: "identity-service oks" });
});


app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;