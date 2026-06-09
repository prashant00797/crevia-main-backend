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

    const historyData = await generationService.historyService(req.user, req.query)

    return res.status(200).json({
        status: "success",
        data: historyData
    })
}
