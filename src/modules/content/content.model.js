import mongoose from "mongoose"

const contentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 250
    },
    platform: {
        type: String,
        required: true,
        enum: ["youtube", "instagram", "x", "linkedin", "blog", "other"],
        default: "other"

    },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value >= new Date(new Date().setHours(0, 0, 0, 0)),
            message: "Due date cannot be in the past"
        }
    },
    stage: {
        type: String,
        enum: ["ideas", "writing", "editing", "published"],
        default: "ideas"
    }
}, {
    timestamps: true
})

export const Content = mongoose.model("Content", contentSchema)