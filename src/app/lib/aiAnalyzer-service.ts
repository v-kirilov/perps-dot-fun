"use server";
// https://api.openai.com/v1

import OpenAI from "openai";

export const askGPT = async function (input: string): Promise<string> {
  const client: any = new OpenAI({
    apiKey: process.env.PERPS_FUN_OAI_KEY, 
  });

  const response = await client.responses.create({
    model: "gpt-5-nano",
    instructions: "You are a trader and a financial expert. I want you to give me your outlook on the market based on the following data I provide in the input. Also make sure to format the output as a JSON object with the following fields: 'summary', 'trend', 'key_levels', and 'recommendation'. Be concise and to the point.",
    input: input,
  });

  console.log(response.output_text);
  return response.output_text;
};
