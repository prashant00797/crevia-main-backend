import aiResponse from "../../utils/openAi.js"
import * as aiResponseSchema from "../../zodSchema/generation.zod.js"
import * as syspmt from "../../utils/prompts.js"
import { APIError } from "openai"
import { AIGeneration } from "./generation.model.js"

export const captionService = async (request, user) => {

    const { tool, prompt, platform, tone } = request
    const userInput = `Topic: ${prompt} Platform: ${platform} Tone: ${tone}`

    const response = await aiResponse(aiResponseSchema.captionsResponseSchema, syspmt.captionGenerationSysPmt, userInput)

    if (!response?.captions?.length) {
        throw new APIError("Our model is facing issues, please try again later")
    }

    const content = await new AIGeneration({
        tool: tool,
        prompt,
        platform,
        tone,
        result: JSON.stringify(response),
        createdBy: user._id
    })

    await content.save()

    return content

}

export const ideaService = async (request, user) => {

    const { tool, prompt } = request
    const userInput = `Niche / Topic: ${prompt}`

    const response = await aiResponse(aiResponseSchema.ideaResponseSchema, syspmt.contentIdeaGenerationSysPmt, userInput)

    if (!response?.ideas?.length) {
        throw new APIError("Our model is facing issues, please try again later")
    }

    const content = await new AIGeneration({
        tool: tool,
        prompt,
        result: JSON.stringify(response),
        createdBy: user._id
    })

    await content.save()

    return content
}

export const sponsorshipService = async (request, user) => {
    const { tool, sponsorName, productService, prompt, tone } = request
    const userInput = `
    Sponsor / Brand Name: ${sponsorName}
    Their Product or Service: ${productService}
    My Niche: ${prompt}
    Tone: ${tone}`

    const response = await aiResponse(aiResponseSchema.sponsorResponseEmailSchema, syspmt.sponsorEmailGenerationSysPmt, userInput)
    console.log(response);

    if (!response?.subject?.length || !response?.body?.length) {
        throw new APIError("Our model is facing issues, please try again later")
    }

    const content = await new AIGeneration({
        tool: tool,
        sponsorName,
        productService,
        prompt,
        tone,
        result: JSON.stringify(response),
        createdBy: user._id
    })

    await content.save()

    return content
}

export const historyService = async (user, query) => {
    const page = parseInt(query.page) || 1;
    const LIMIT = 2
    const skip = (page - 1) * LIMIT

    const contentList = await AIGeneration.find({ createdBy: user._id }).skip(skip).limit(LIMIT)

    return contentList
}