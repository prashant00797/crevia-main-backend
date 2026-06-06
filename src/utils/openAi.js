import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI();

const aiResponse = async (schema, sys_pmt, user_input) => {

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
    return response.output_parsed
}

export default aiResponse

