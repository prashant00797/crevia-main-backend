import * as contentService from "./content.service.js"


export const createContent = async (req, res) => {

    const contentData = await contentService.createContentService(req.body, req.user)

    return res.status(201).json({
        status: "success",
        data: contentData
    })
}

export const getAllContent = async (req, res) => {

    const contentList = await contentService.getAllContentService(req.user)

    return res.status(200).json({
        status: "success",
        data: contentList
    })
}

export const editContent = async (req, res) => {

    const contentId = req.params.id
    const updatedContent = await contentService.updateContentService(contentId, req.body, req.user)

    return res.status(200).json({
        status: "success",
        data: updatedContent
    })
}

export const deleteContent = async (req, res) => {

    const contentId = req.params.id

    await contentService.deleteContentService(contentId, req.user)

    return res.status(204).end()
}

export const contentStats = async (req, res) => {

    const stats = await contentService.getContentStatsService(req.user)

    return res.status(200).json({
        status: "success",
        data: stats
    })
}

export const contentDeadline = async (req, res) => {

    const contentDeadlineList = await contentService.getContentDeadlineService(req.user)

    if (contentDeadlineList.length === 0) {
        return res.status(200).json({
            status: "success",
            message: "No Deadline. You are all set"
        })
    }

    return res.status(200).json({
        status: "success",
        data: contentDeadlineList
    })
}
