import { Router } from "express"
import * as authController from "./auth.controller.js"
import * as authMiddleware from "../../middlewares/auth.middleware.js"
import { loginSchema, registerSchema } from "../../zodSchema/auth.zod.js"
const authRouter = Router()


authRouter.post("/register", authMiddleware.validateAuthRequest(registerSchema), authController.registerUser)
authRouter.post("/login", authMiddleware.validateAuthRequest(loginSchema), authController.loginUser)
authRouter.post("/refresh-token", authController.refreshToken)
authRouter.post("/logout", authController.logoutUser)

export default authRouter