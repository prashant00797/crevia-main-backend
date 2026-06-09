import { z } from "zod"

const TOOL = ["caption", "idea", "sponsor"]
const PLATFORM = ["youtube", "instagram", "x", "linkedin", "blog", "other"]
const TONE = ["Professional", "Casual", "Friendly", "Educational", "Storytelling", "Technical", "Humorous", "Inspirational", "Luxury"]

export const captionRequestSchema = z.object({
    tool: z.enum(TOOL),
    prompt: z.string().trim().min(20),
    platform: z.enum(PLATFORM),
    tone: z.enum(TONE)
}).strict()

export const ideaRequestSchema = z.object({
    tool: z.enum(TOOL),
    prompt: z.string().trim().min(20),
}).strict()

export const sponsorEmailRequestSchema = z.object({
    tool: z.enum(TOOL),
    prompt: z.string().trim().min(20),
    sponsorName: z.string(),
    productService: z.string(),
    tone: z.enum(TONE)
}).strict()

// TODO -> Right the exact error response
export const captionsResponseSchema = z.object({
    captions: z.array(z.string())
}).strict().refine(d => d.captions.length > 0, "captions must not be empty")

export const ideaResponseSchema = z.object({
    ideas: z.array(z.string())
}).strict().refine(d => d.ideas.length > 0, "ideas must not be empty")

export const sponsorResponseEmailSchema = z.object({
    subject: z.string(),
    body: z.string()
}).strict().refine(d => d.subject.length > 0 && d.body.length > 0, "subject and body must not be empty")

