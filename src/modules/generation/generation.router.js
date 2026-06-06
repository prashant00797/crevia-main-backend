import { Router } from "express";
import * as authMiddleware from "../../middlewares/auth.middleware.js"
import { validateRequest } from "../../middlewares/request.middleware.js"
import * as generationController from "./generation.controller.js"
import { captionRequestSchema, ideaRequestSchema, sponsorEmailRequestSchema } from "../../zodSchema/generation.zod.js";
const generateRouter = Router()


generateRouter.post("/caption", authMiddleware.validateUser, validateRequest(captionRequestSchema), generationController.caption)
generateRouter.post("/idea", authMiddleware.validateUser, validateRequest(ideaRequestSchema), generationController.idea)
generateRouter.post("/sponsor", authMiddleware.validateUser, validateRequest(sponsorEmailRequestSchema), generationController.sponsorship)
generateRouter.get("/history", authMiddleware.validateUser, generationController.history)

export default generateRouter