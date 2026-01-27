"use server";
// https://api.openai.com/v1

import OpenAI from "openai";

export const askGPT = async function (
  input: string,
  model: string = "gpt-5-nano",
): Promise<string> {
  const client: any = new OpenAI({
    apiKey: process.env.PERPS_FUN_OAI_KEY,
  });

  const response = await client.responses.create({
    model: model,
    instructions:
      "You are a trader and a financial expert. I want you to give me your outlook on the market based on the following data I provide in the input. Be concise and to the point and give recommendations what to do in the current market. Put every key points on a new row. If you notice any patterns, mention them. If you see any trading signals, mention them. If you don't see anything relevant, just say 'No significant patterns or signals detected'. Format the text in this way:    Market Outlook \\n  Key Levels \\n Patterns Detected \\n  Trading Signals \\n  Recommendations \\n Stop-Loss and any other you find relevant.",
    input: input,
  });

  return response.output_text;
};
