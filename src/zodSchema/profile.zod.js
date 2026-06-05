import { z } from "zod"

export const profilePasswordUpdateSchema = z.object({
    currentPassword: z.string().trim().min(8),
    newPassword: z.string().trim().min(8)
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a symbol"),
}).strict()