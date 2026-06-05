import { ApiError } from "../../utils/ApiError.js"
import * as contentService from "./content.service.js"
export const createContent = async (req, res) => {
    const contentData = await contentService.createContentService(req.body, req.user)
    res.status(201).json({
        status: "success",
        data: contentData
    })
}

export const getAllContent = async (req, res) => {
    const contentList = await contentService.getAllContentService(req.user)
    if (contentList.length === 0) {
        return res.status(200).json({
            status: "success",
            message: "No content found"
        })
    }
    res.status(200).json({
        status: "success",
        data: contentList
    })
}

export const editContent = async (req, res) => {
    const contentId = req.params.id
    const updatedContent = await contentService.updateContentService(contentId, req.body, req.user)
    res.status(200).json({
        status: "success",
        data: updatedContent
    })
}

export const deleteContent = async (req, res) => {
    const contentId = req.params.id

    await contentService.deleteContentService(contentId, req.user)
    res.status(204).end()
}