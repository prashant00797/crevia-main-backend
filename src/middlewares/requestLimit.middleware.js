import rateLimit from "express-rate-limit"
import slowDown from "express-slow-down"

export const slowDownApi = ({ windowMs, delayAfter }) => {
    return slowDown({
        windowMs: windowMs,
        delayAfter: delayAfter,
        delayMs: (hits) => (hits - delayAfter) * 1000
    })
}

export const rateLimiterApi = ({ windowMs, max, delayAfter, limitFor }) => {
    return rateLimit({
        windowMs: windowMs,
        max: max,
        message: {
            status: "error",
            message: `To many ${limitFor} attempts. Please try again later`
        },
        standardHeaders: true,
        legacyHeaders: false
    })
}