import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
    "username": {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 20,
    },
    "email": {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one symbol")
            }
        }
    }
}, {
    timestamps: true
})




const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    revoked: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)



export const User = mongoose.model("User", userSchema)
export const Session = mongoose.model("Session", sessionSchema)