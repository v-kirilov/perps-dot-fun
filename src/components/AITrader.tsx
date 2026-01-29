"use client";

import { useEffect, useState } from "react";
import DropDownButton from "./ui/DropDownButton";
import Button from "./ui/Button";
import { askGPT } from "@/app/lib/aiAnalyzer-service";
import { fetchLastNCandles } from "@/app/lib/binance-service";
import { CgSpinner } from "react-icons/cg";

const INTERVALS = ["15m", "1h", "2h", "4h", "1d", "1w", "1M"] as const;
const HISTORY = ["10", "20", "50", "100"] as const;
const MODEL = ["gpt-5.2", "gpt-5-nano", "gpt-4.1-nano", "gpt-4o-mini"] as const;
type IntervalType = (typeof INTERVALS)[number];
type HistoryType = (typeof HISTORY)[number];
type ModelType = (typeof MODEL)[number];

export default function AITrader() {
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>("1h");
  const [selectedHistory, setSelectedHistory] = useState<HistoryType>("10");
  const [selectedModel, setSelectedModel] = useState<ModelType>("gpt-5.2");
  const [isMounted, setIsMounted] = useState(false);
  const [aiOutput, setAiOutput] = useState("");
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleGeminiCall() {
    setAiOutput("");
    setIsLoadingAIResponse(true);
    const input = await fetchLastNCandles(
      selectedInterval,
      parseInt(selectedHistory),
    );

    const response = await askGPT(JSON.stringify(input), selectedModel);
    setAiOutput(response || "No response from AI");
    setIsLoadingAIResponse(false);
  }

  function formatAIOutput(text: string) {
    // Replace ### headers with styled divs, single <br> for dashes, and bold for **text**
    return text
      .replace(/### (.*?)(?=\n|$)/g, '<div class="font-semibold text-base mt-2 mb-1">$1</div>')
      .replace(/\n- /g, '<br /><span class="pl-2">• </span>')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\n{2,}/g, '<br />') // collapse multiple newlines
      .replace(/\n/g, '<br />');
  }

  function getButtonContent() {
    if (!isMounted) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <span>Loading...</span>
        </div>
      );
    }
    if (isLoadingAIResponse) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <CgSpinner className="animate-spin" size={20} />
          <span>Generating... </span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 w-full">
        <span>Ask AI </span>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto my-12 px-6">
      {/* Animated background elements */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute top-40 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000 z-0" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500 z-0" />

      {/* Glassmorphism card */}
      <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-lg shadow-green-500/10 p-8 md:p-16">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            AI Trading Assistant
          </h2>
          <p className="text-gray-400 text-center max-w-lg">
            Get instant AI-powered trading analysis. Select your model, timeframe, and history, then let the AI analyze the market for you.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">Model</span>
            <DropDownButton
              options={MODEL}
              selectedOption={selectedModel}
              onOptionChange={setSelectedModel}
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">Timeframe</span>
            <DropDownButton
              options={INTERVALS}
              selectedOption={selectedInterval}
              onOptionChange={setSelectedInterval}
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">History</span>
            <DropDownButton
              options={HISTORY}
              selectedOption={selectedHistory}
              onOptionChange={setSelectedHistory}
            />
          </div>
        </div>

        {/* Ask AI Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleGeminiCall}
            type="big"
            disabled={!isMounted || isLoadingAIResponse}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-white text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
          >
            {getButtonContent()}
          </Button>
        </div>

        {/* AI Output */}
        <div className="mt-4 font-sans text-base text-gray-200 min-h-[60px] border border-white/10 rounded-xl bg-black/20 p-4" dangerouslySetInnerHTML={{ __html: formatAIOutput(aiOutput) }} />
      </div>
    </div>
  );
}
