import bcrypt from "bcrypt"
import { ApiError } from "../../utils/ApiError.js"
import { Session, User } from "../auth/auth.model.js"

export const updateProfilePasswordService = async (request, user) => {

    const currentPasswordInDB = user.password
    const currentPasswordInRequest = request.currentPassword
    const isPasswordValid = await bcrypt.compare(currentPasswordInRequest, currentPasswordInDB)

    if (!isPasswordValid) {
        throw new ApiError(401, "Current password is incorrect")
    }

    const newPasswordHash = await bcrypt.hash(request.newPassword, 10)

    await User.findByIdAndUpdate(user._id, { password: newPasswordHash })

    await Session.updateMany(
        { userId: user._id, revoked: false },
        { revoked: true }
    )
}
