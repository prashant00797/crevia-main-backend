import Groq from "groq-sdk";
import { z } from "zod";
import { isRetryable } from "../utils/constants.js";

const groq = new Groq();

const groqResponse = async (schema, sys_pmt, user_input) => {
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content: sys_pmt,
                },
                {
                    role: "user",
                    content: user_input
                },
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "content_generation",
                    schema: z.toJSONSchema(schema)
                }
            }
        });

        const rawResult = JSON.parse(response.choices[0].message.content || "{}");
        const result = schema.parse(rawResult);
        return { ok: true, data: result, provider: "groq" }
    } catch (error) {
        return { ok: false, provider: "groq", isRetryable: isRetryable(error.status), status: error.status, error: error.message }
    }

}

export default groqResponse