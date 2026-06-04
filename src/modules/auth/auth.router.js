import { Router } from "express"
import * as authController from "./auth.controller.js"
import * as authMiddleware from "../../middlewares/auth.middleware.js"
const authRouter = Router()


authRouter.post("/register", authMiddleware.validateRegisterRequest, authController.registerUser)
authRouter.post("/refresh-token", authController.refreshToken)
authRouter.post("/login", authMiddleware.validateLoginRequest, authController.loginUser)
authRouter.post("/logout", authController.logoutUser)

export default authRouter