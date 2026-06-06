import { z } from "zod"

const TOOL = ["caption", "idea", "sponsor"]
const PLATFORM = ["youtube", "instagram", "x", "linkedin", "blog", "other"]
const TONE = ["Professional", "Casual", "Friendly", "Educational", "Storytelling", "Technical", "Humorous", "Inspirational", "Luxury"]

export const captionRequestSchema = z.object({
    tool: z.enum(TOOL),
    prompt: z.string(),
    platform: z.enum(PLATFORM),
    tone: z.enum(TONE)
}).strict()

export const ideaRequestSchema = z.object({
    tool: z.enum(TOOL),
    prompt: z.string(),
}).strict()

export const sponsorEmailRequestSchema = z.object({
    tool: z.enum(TOOL),
    prompt: z.string(),
    sponsorName: z.string(),
    productService: z.string(),
    tone: z.enum(TONE)
}).strict()


export const captionsResponseSchema = z.object({
    captions: z.array(z.string())
}).strict()

export const ideaResponseSchema = z.object({
    ideas: z.array(z.string())
}).strict()

export const sponsorResponseEmailSchema = z.object({
    subject: z.string(),
    body: z.string()
}).strict()

