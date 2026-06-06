import mongoose from "mongoose";

const generateContentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    tool: {
        type: String,
        enum: ["caption", "idea", "sponsor"]
    },
    prompt: {
        type: String,
        minLength: 20
    },
    platform: {
        type: String,
        enum: ["youtube", "instagram", "x", "linkedin", "blog", "other"],
        default: "other"

    },
    tone: {
        type: String,
        enum: ["Professional", "Casual", "Friendly", "Educational", "Storytelling", "Technical", "Humorous", "Inspirational", "Luxury"]
    },
    sponsorName: {
        type: String,
    },
    productService: {
        type: String,
    },
    result: {
        type: String
    },
},
    {
        timestamps: true
    }
)

export const AIGeneration = mongoose.model("AIGeneration", generateContentSchema);