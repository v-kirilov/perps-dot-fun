"use server";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import {GoogleGenAI} from '@google/genai';

// Initialize AI client with direct process.env.API_KEY access
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateContentFromMLDev() {
    console.log(process.env.GEMINI_API_KEY);
  const response = await getAIClient().models.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'why is the sky blue?',
  });
  console.debug(response.text);
  console.log('Response from Gemini ML Dev:', response);
  console.log('Response from Gemini ML Dev:', response.text);
}
