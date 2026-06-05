import { ApiError } from "../../utils/ApiError.js"
import { Content } from "./content.model.js"

export const createContentService = async (requestBody, user) => {


    const newContentData = new Content({
        ...requestBody,
        createdBy: user._id
    })
    await newContentData.save()

    return newContentData

}

export const getAllContentService = async (user) => {


    const contentList = await Content.find({ createdBy: user._id })


    return {
        ideas: contentList.filter((list) => list.stage === "ideas"),
        writing: contentList.filter((list) => list.stage === "writing"),
        editing: contentList.filter((list) => list.stage === "editing"),
        published: contentList.filter((list) => list.stage === "published")
    }

}

export const updateContentService = async (contentId, requestBody, user) => {


    const updatedContent = await Content.findOneAndUpdate(
        {
            _id: contentId, createdBy: user._id
        },
        requestBody,
        {
            returnDocument: "after", runValidators: true
        })

    if (!updatedContent) {
        throw new ApiError(404, "No content found")
    }

    return updatedContent
}

export const deleteContentService = async (contentId, user) => {
    const deletedContent = await Content.findOneAndDelete(
        {
            _id: contentId, createdBy: user._id
        }
    )

    if (!deletedContent) {
        throw new ApiError(404, "No content found")
    }

}

export const getContentStatsService = async (user) => {
    const statsList = await Content.aggregate([
        { $match: { createdBy: user._id } },
        { $group: { _id: "$stage", count: { $sum: 1 } } }
    ]
    )
    return statsList

}

export const getContentDeadlineService = async (user) => {

    const deadlineList = await Content.find({ createdBy: user._id, stage: { $ne: "published" }, dueDate: { $gte: new Date } }).sort({ dueDate: 1 }).limit(3).select("title platform dueDate")

    return deadlineList
}