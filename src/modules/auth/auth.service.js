import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { User } from "../user/user.model.js"
import config from "../../config/env.js"
import { Session } from "../auth/auth.model.js"

const hash = (token) => crypto.createHash("sha256").update(token).digest("hex")

export const registerService = async (req) => {
    const { username, email, password } = req.body

    const isUserExist = await User.findOne(
        {
            $or: [
                { username },
                { email }
            ]
        }
    )
    if (isUserExist) {
        throw new Error("User already exists")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        email,
        password: passwordHash
    })

    const refreshToken = jwt.sign({ userId: user._id, type: "refresh" }, config.JWT_REFRESH_SECRET_KEY, { expiresIn: "7d" })
    const refreshTokenHash = hash(refreshToken)

    await user.save()


    const session = await Session.create({
        userId: user._id,
        refreshTokenHash: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign({ userId: user._id, type: "access", sessionId: session._id }, config.JWT_ACCESS_SECRET_KEY, { expiresIn: "10m" })

    return {
        user,
        accessToken,
        refreshToken
    }

}
export const loginService = async (req) => {
    const { username, email, password } = req.body


    const conditions = []
    if (username) conditions.push({ username })
    if (email) conditions.push({ email })

    const user = await User.findOne({ $or: conditions })


    if (!user) {
        throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error("Invalid Credentials")
    }

    const refreshToken = jwt.sign({ userId: user._id, type: "refresh" }, config.JWT_REFRESH_SECRET_KEY, { expiresIn: "7d" })

    const refreshTokenHashed = hash(refreshToken)
    const session = await Session.create({
        userId: user._id,
        refreshTokenHash: refreshTokenHashed,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    const accessToken = jwt.sign({ userId: user._id, type: "access", sessionId: session._id }, config.JWT_ACCESS_SECRET_KEY, { expiresIn: "10m" })

    return {
        user,
        accessToken,
        refreshToken
    }
}

export const refreshTokenService = async (refreshToken) => {
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY)

    if (decoded.type !== "refresh") {
        throw new Error("Invalid token type")
    }

    const session = await Session.findOne({
        refreshTokenHash: hash(refreshToken),
        revoked: false
    })

    if (!session) {
        throw new Error("Session Invalid")
    }

    const accessToken = jwt.sign({ userId: decoded.userId, type: "access", sessionId: session._id }, config.JWT_ACCESS_SECRET_KEY, { expiresIn: "10m" })
    return accessToken
}


export const logoutUserService = async (refreshToken) => {
    const session = await Session.findOne({
        refreshTokenHash: hash(refreshToken),
        revoked: false
    })

    if (!session) {
        throw new Error("Session Invalid")
    }
    session.revoked = true
    await session.save()
}