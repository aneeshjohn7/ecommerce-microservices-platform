import express from "express";
import catalogRoutes from "./modules/catalog/catalog.routes";


const app = express();


app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "catalog-service ok" });
});

app.use("/catalog", catalogRoutes);


export default app;