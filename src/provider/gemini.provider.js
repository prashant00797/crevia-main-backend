import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { isRetryable } from "../utils/constants.js";

const ai = new GoogleGenAI({});

const geminiResponse = async (schema, sys_pmt, user_input) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: user_input,
            config: {
                systemInstruction: sys_pmt,
                responseMimeType: "application/json",
                responseJsonSchema: z.toJSONSchema(schema),
            },
        });

        const generatedData = schema.parse(JSON.parse(response.text));
        return { ok: true, data: generatedData, provider: "gemini" }
    } catch (error) {
        return { ok: false, provider: "gemini", status: error.status, isRetryable: isRetryable(error.status), error: error.message }
    }
}

export default geminiResponse


