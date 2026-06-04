import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

//health check
app
  .get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  })
  .head("/health", (req, res) => {
    res.status(200).end();
  });

export default app;
