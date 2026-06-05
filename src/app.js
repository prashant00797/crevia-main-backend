import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.router.js";
import profileRouter from "./modules/profile/profile.router.js";
import contentRouter from "./modules/content/content.router.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", profileRouter)
app.use("/api/v1/content", contentRouter)

//health check
app
  .get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  })
  .head("/health", (req, res) => {
    res.status(200).end();
  });

//error handler
app.use(errorHandler)

export default app;
