import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/index.js";
import userRouter from "./modules/user/index.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)



//health check
app
  .get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  })
  .head("/health", (req, res) => {
    res.status(200).end();
  });

export default app;
