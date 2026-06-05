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

    return contentList

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