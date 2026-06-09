import geminiResponse from "../provider/gemini.provider.js"
import groqResponse from "../provider/groq.provider.js"
import openAiResponse from "../provider/openai.provider.js"
import { ApiError } from "../utils/ApiError.js"

const PROVIDERS = [geminiResponse, groqResponse, openAiResponse]

const llmGateway = async (schema, sys_pmt, user_input) => {
    let last;
    for (const callProvider of PROVIDERS) {
        const result = await callProvider(schema, sys_pmt, user_input)
        if (result.ok) {
            console.log(`[llmGateway] served by ${result.provider}`)
            return result                      // successfully work done by provider
        }

        // a provider failed — hence logging it to know why it failover or stop
        console.warn(`[llmGateway] ${result.provider} failed — status=${result.status} retryable=${result.isRetryable} :: ${result.error}`)
        last = result                          // store the failed result
        if (!result.isRetryable) break         // error apart from ai i.e, from dev end
    }

    // Throw error when all providers fail. Turn the last failure into an error.
    throw new ApiError(last.isRetryable ? 503 : (last.status ?? 500), last.error)
}

export default llmGateway
