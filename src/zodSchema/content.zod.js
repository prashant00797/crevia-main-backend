import { z } from "zod";

export const createContentRequestSchema = z.object({
    title: z.string().trim().min(1).max(100),
    description: z.string().min(20).max(250),
    platform: z.enum(["youtube", "instagram", "x", "linkedin", "blog", "other"]).default("other"),
    dueDate: z.coerce.date().refine(
        (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
        "Due date cannot be in the past"
    ),
    stage: z.enum(["ideas", "writing", "editing", "published"]).default("ideas")
}).strict()

export const updateContentRequestSchema = createContentRequestSchema.partial().refine(obj => Object.keys(obj).length > 0, "At least one field must be provided");

