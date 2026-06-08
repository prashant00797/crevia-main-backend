import { ApiError } from "../../utils/ApiError.js"
import * as authService from "./auth.service.js"

export const registerUser = async (req, res) => {

    const registeredUserData = await authService.registerService(req)

    res.cookie("token", registeredUserData.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json({
        status: "success",
        data:
        {
            userId: registeredUserData.user._id,
            fullname: registeredUserData.user.fullname,
            userName: registeredUserData.user.username,
            email: registeredUserData.user.email,
            accessToken: registeredUserData.accessToken
        }

    })

}

export const loginUser = async (req, res) => {

    const loggedInUserData = await authService.loginService(req);

    res.cookie("token", loggedInUserData.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json({
        status: "success",
        data:
        {
            userId: loggedInUserData.user._id,
            fullname: loggedInUserData.user.fullname,
            userName: loggedInUserData.user.username,
            email: loggedInUserData.user.email,
            accessToken: loggedInUserData.accessToken
        }

    })

}


export const refreshToken = async (req, res) => {

    const refreshToken = req.cookies.token
    if (!refreshToken) {
        throw new ApiError(401, "Unauthorized")
    }
    const accessToken = await authService.refreshTokenService(refreshToken)
    return res.status(201).json({
        status: "success",
        data: {
            accessToken
        }
    })
}



export const logoutUser = async (req, res) => {

    const refreshToken = req.cookies.token;

    if (!refreshToken) {
        throw new ApiError(401, "Unauthorized")
    }

    await authService.logoutUserService(refreshToken)

    res.clearCookie("token")

    return res.status(200).json({
        status: "success",
        message: "Logged Out"
    })

}