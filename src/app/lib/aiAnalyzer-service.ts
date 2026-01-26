"use server";
// https://api.openai.com/v1

import OpenAI from "openai";

export const askGPT = async function () {
   // process.loadEnvFile;
  //  process.env['OPENAI_API_KEY']
  console.log("API KEY:", process.env.OPENAI_API_KEY);
  const client: any = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
  });

  const response = await client.responses.create({
    model: "gpt-4o",
    instructions: "You are a coding assistant that talks like a pirate",
    input: "Are semicolons optional in JavaScript?",
  });

  console.log(response.output_text);
};
