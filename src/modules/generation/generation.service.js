import * as aiResponseSchema from "../../zodSchema/generation.zod.js"
import * as syspmt from "../../utils/prompts.js"
import { AIGeneration } from "./generation.model.js"
import llmGateway from "../../gateways/llmGateWay.js"

export const captionService = async (request, user) => {

    const { tool, prompt, platform, tone } = request
    const userInput = `Topic: ${prompt} Platform: ${platform} Tone: ${tone}`

    const { data, provider } = await llmGateway(aiResponseSchema.captionsResponseSchema, syspmt.captionGenerationSysPmt, userInput)

    const content = await new AIGeneration({
        tool: tool,
        prompt,
        platform,
        tone,
        result: JSON.stringify(data),
        createdBy: user._id,
        provider
    })

    await content.save()

    return content

}

export const ideaService = async (request, user) => {

    const { tool, prompt } = request
    const userInput = `Niche / Topic: ${prompt}`

    const { data, provider } = await llmGateway(aiResponseSchema.ideaResponseSchema, syspmt.contentIdeaGenerationSysPmt, userInput)

    const content = await new AIGeneration({
        tool: tool,
        prompt,
        result: JSON.stringify(data),
        createdBy: user._id,
        provider
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

    const { data, provider } = await llmGateway(aiResponseSchema.sponsorResponseEmailSchema, syspmt.sponsorEmailGenerationSysPmt, userInput)

    const content = await new AIGeneration({
        tool: tool,
        sponsorName,
        productService,
        prompt,
        tone,
        result: JSON.stringify(data),
        createdBy: user._id,
        provider
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