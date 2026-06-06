import { Router } from "express"
import * as authController from "./auth.controller.js"
import * as requestMiddleware from "../../middlewares/request.middleware.js"
import { loginSchema, registerSchema } from "../../zodSchema/auth.zod.js"

const authRouter = Router()

authRouter.post("/register", requestMiddleware.validateRequest(registerSchema), authController.registerUser)
authRouter.post("/login", requestMiddleware.validateRequest(loginSchema), authController.loginUser)
authRouter.post("/refresh-token", authController.refreshToken)
authRouter.post("/logout", authController.logoutUser)

export default authRouter