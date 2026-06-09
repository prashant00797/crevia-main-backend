import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { isRetryable } from "../utils/constants.js";

const client = new OpenAI();

export const openAiResponse = async (schema, sys_pmt, user_input) => {
    try {
        const response = await client.responses.parse({
            model: "gpt-4o-mini",
            input: [
                { role: "system", content: sys_pmt },
                {
                    role: "user",
                    content: user_input,
                },
            ],
            text: {
                format: zodTextFormat(schema, "response"),
            },
        });
        return { ok: true, data: response.output_parsed, provider: "openai" }
    } catch (error) {
        return { ok: false, provider: "openai", status: error.status, isRetryable: isRetryable(error.status), error: error.message }
    }


}

export default openAiResponse

