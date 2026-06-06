import aiResponse from "../../utils/openAi.js"
import * as generationService from "./generation.service.js"
export const caption = async (req, res) => {

    const content = await generationService.captionService(req.body, req.user)

    res.status(201).json({
        status: "success",
        data: content
    })

}
export const idea = async (req, res) => {

    const content = await generationService.ideaService(req.body, req.user)

    res.status(201).json({
        status: "success",
        data: content
    })
}
export const sponsorship = async (req, res) => {

    const content = await generationService.sponsorshipService(req.body, req.user)

    res.status(201).json({
        status: "success",
        data: content
    })
}
export const history = async (req, res) => {

    const contentList = await generationService.historyService(req.user, req.query)

    if (!contentList.length === 0) {
        return res.status(200).json({
            status: "sucess",
            message: "No content generated"
        })
    }

    res.status(200).json({
        status: "sucess",
        data: contentList
    })
}