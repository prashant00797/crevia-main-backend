import * as authService from "./auth.service.js"

export const registerUser = async (req, res) => {
    try {
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
                userName: registeredUserData.user.username,
                email: registeredUserData.user.email,
                accessToken: registeredUserData.accessToken
            }

        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
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
                userName: loggedInUserData.user.username,
                email: loggedInUserData.user.email,
                accessToken: loggedInUserData.accessToken
            }

        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}


export const refreshToken = async (req, res) => {
    try {

        const refreshToken = req.cookies.token
        if (!refreshToken) {
            throw new Error("Please Login Again")
        }
        const accessToken = await authService.refreshTokenService(refreshToken)
        return res.status(201).json({
            status: "success",
            data: {
                accessToken
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }

}



export const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.token;
        if (!refreshToken) {
            return res.status(404).json({
                "status": "error",
                message: "Invalid Token"
            })
        }
        await authService.logoutUserService(refreshToken)
        res.clearCookie("token")
        return res.status(200).json({
            status: "success",
            message: "Logged Out"
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}