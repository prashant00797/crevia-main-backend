import { registerSchema, loginSchema } from "../zodSchema/auth.zod.js"
import jwt from "jsonwebtoken"
import config from "../config/env.js"
import { User } from "../modules/auth/auth.model.js"

export const validateUser = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized"
            })
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET_KEY)
        if (decoded.type !== "access") {
            return res.status(401).json({ status: "error", message: "Invalid token type" })
        }
        const userData = await User.findById(decoded.userId)

        if (!userData) {
            return res.status(404).json({ status: "error", message: "No user found" })
        }

        req.user = userData

        next()
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Invalid credentials"
        })
    }

}