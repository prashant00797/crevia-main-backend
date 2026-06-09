import { Router } from "express"
import * as authController from "./auth.controller.js"
import { slowDownApi, rateLimiterApi } from "../../middlewares/requestLimit.middleware.js"
import { AUTH_LIMITS } from "../../utils/constants.js"
import * as requestMiddleware from "../../middlewares/request.middleware.js"
import { loginSchema, registerSchema } from "../../zodSchema/auth.zod.js"

const authRouter = Router()

authRouter.post("/register", slowDownApi(AUTH_LIMITS.REGISTER), rateLimiterApi(AUTH_LIMITS.REGISTER), requestMiddleware.validateRequest(registerSchema), authController.registerUser)
authRouter.post("/login", slowDownApi(AUTH_LIMITS.LOGIN), rateLimiterApi(AUTH_LIMITS.LOGIN), requestMiddleware.validateRequest(loginSchema), authController.loginUser)
authRouter.post("/refresh-token", rateLimiterApi(AUTH_LIMITS.REFRESH_TOKEN), authController.refreshToken)
authRouter.post("/logout", authController.logoutUser)

export default authRouter