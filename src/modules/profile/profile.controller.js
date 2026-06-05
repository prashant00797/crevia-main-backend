import * as profileService from "./profile.service.js"


export const getUserProfile = (req, res) => {
    const { _id, username, email } = req.user
    res.status(200).json({
        status: "success",
        data: { userId: _id, userName: username, email }
    })
}

export const updateProfilePassword = async (req, res) => {

    await profileService.updateProfilePasswordService(req.body, req.user)

    res.status(200).json({
        status: "success",
        message: "Password Updated"
    })
}