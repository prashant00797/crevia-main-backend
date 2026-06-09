export const isRetryable = (status) =>
    status === undefined || status === 429 || status >= 500;

export const AUTH_LIMITS = {
    REGISTER: {
        windowMs: 15 * 60 * 1000,
        delayAfter: 2,
        max: 5,
        limitFor: "registration"
    },
    LOGIN: {
        windowMs: 60 * 1000,
        delayAfter: 5,
        max: 10,
        limitFor: "login"
    },
    REFRESH_TOKEN: {
        windowMs: 15 * 60 * 1000,
        max: 30,
    }
};

export const PROFILE_LIMIT = {
    PASSWORD: {
        windowMs: 25 * 60 * 1000,
        delayAfter: 2,
        max: 4,
        limitFor: "update password"
    },
}