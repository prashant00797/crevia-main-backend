import express from "express";
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.router.js";
import profileRouter from "./modules/profile/profile.router.js";
import contentRouter from "./modules/content/content.router.js";
import generateRouter from "./modules/generation/generation.router.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // for cookies and in frontend credentails:include for fetch and withCredentials:true in axios
  })
);

//parsers
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());





//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", profileRouter)
app.use("/api/v1/content", contentRouter)
app.use("/api/v1/ai", generateRouter)


//health
app
  .get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  })
  .head("/health", (req, res) => {
    res.status(200).end();
  });


//404
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});


//error handler
app.use(errorHandler)

export default app;
