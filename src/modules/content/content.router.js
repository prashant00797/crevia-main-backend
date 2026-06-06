import { Router } from "express";
import * as contentController from "./content.controller.js"
import * as requestMiddleware from "../../middlewares/request.middleware.js"
import * as authMiddleware from "../../middlewares/auth.middleware.js"
import { createContentRequestSchema, updateContentRequestSchema } from "../../zodSchema/content.zod.js";

const contentRouter = Router()

contentRouter.post("/create-content", authMiddleware.validateUser, requestMiddleware.validateRequest(createContentRequestSchema), contentController.createContent)
contentRouter.get("/all-content", authMiddleware.validateUser, contentController.getAllContent)
contentRouter.patch("/edit-content/:id", authMiddleware.validateUser, requestMiddleware.validateRequest(updateContentRequestSchema), contentController.editContent)
contentRouter.delete("/delete-content/:id", authMiddleware.validateUser, contentController.deleteContent)
contentRouter.get("/content-stats", authMiddleware.validateUser, contentController.contentStats)
contentRouter.get("/content-deadline", authMiddleware.validateUser, contentController.contentDeadline)


export default contentRouter