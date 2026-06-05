import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(5).max(20).trim(),
    email: z.string().email().trim().lowercase(),
    password: z.string().trim().min(8)
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a symbol")
}).strict()

export const loginSchema = z.object({
    username: z.string().min(5).max(20).trim().optional(),
    email: z.string().email().trim().lowercase().optional(),
    password: z.string().trim()
}).strict().refine(
    (data) => data.username || data.email,
    { message: "Either username or email is required" }
)