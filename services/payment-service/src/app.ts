import express from "express";


const app = express();


app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "payment-service ok" });
});


export default app;