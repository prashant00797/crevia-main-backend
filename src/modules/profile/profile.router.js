import { Router } from "express"
import * as authMiddleWare from "../../middlewares/auth.middleware.js"
import * as profileController from "./profile.controller.js"
import * as requestMiddleware from "../../middlewares/request.middleware.js"
import { profilePasswordUpdateSchema } from "../../zodSchema/profile.zod.js"
const profileRouter = Router()


profileRouter.get("/profile", authMiddleWare.validateUser, profileController.getUserProfile)
profileRouter.patch("/update-password", authMiddleWare.validateUser, requestMiddleware.validateRequest(profilePasswordUpdateSchema), profileController.updateProfilePassword)

export default profileRouter