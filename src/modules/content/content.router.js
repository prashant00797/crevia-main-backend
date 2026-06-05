import { Router } from "express";
import * as contentController from "./content.controller.js"
import * as contentMiddleware from "../../middlewares/content.middleware.js"
import * as authMiddleware from "../../middlewares/auth.middleware.js"
import { createContentRequestSchema, updateContentRequestSchema } from "../../zodSchema/content.zod.js";

const contentRouter = Router()

contentRouter.post("/create-content", authMiddleware.validateUser, contentMiddleware.validateContentRequest(createContentRequestSchema), contentController.createContent)
contentRouter.get("/all-content", authMiddleware.validateUser, contentController.getAllContent)
contentRouter.patch("/edit-content/:id", authMiddleware.validateUser, contentMiddleware.validateContentRequest(updateContentRequestSchema), contentController.editContent)
contentRouter.delete("/delete-content/:id", authMiddleware.validateUser, contentController.deleteContent)


export default contentRouter