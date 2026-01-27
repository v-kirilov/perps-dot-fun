"use client";

import { useEffect, useState } from "react";
import DropDownButton from "./ui/DropDownButton";
import Button from "./ui/Button";
import { askGPT } from "@/app/lib/aiAnalyzer-service";
import { fetchLastNCandles } from "@/app/lib/binance-service";
import { CgSpinner } from "react-icons/cg";

const INTERVALS = ["15m", "1h", "2h", "4h", "1d", "1w", "1M"] as const;
const HISTORY = ["10", "20", "50", "100"] as const;
const MODEL = ["gpt-5-nano", "gpt-4.1-nano", "gpt-4o-mini"] as const;
type IntervalType = (typeof INTERVALS)[number];
type HistoryType = (typeof HISTORY)[number];
type ModelType = (typeof MODEL)[number];

export default function AITrader() {
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>("1h");
  const [selectedHistory, setSelectedHistory] = useState<HistoryType>("10");
  const [selectedModel, setSelectedModel] = useState<ModelType>("gpt-5-nano");
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
    <>
      <div className="border-2 border-gray-700 rounded-lg px-4 py-2 gap-4 m-5">
        <div className="flex items-center justify-center h-full mb-4">
          <span className="text-center">
            The AITrader component provides a user interface for selecting a model,
            timeframe and history interval, allowing users to customize
            parameters for AI-powered trading analysis or actions.
          </span>
        </div>

        <div className="flex items-center justify-center">
          <span className="mr-2">Select model:</span>
          <DropDownButton
            options={MODEL}
            selectedOption={selectedModel}
            onOptionChange={setSelectedModel}
          />
          <span className="mr-2">Select timeframe:</span>
          <DropDownButton
            options={INTERVALS}
            selectedOption={selectedInterval}
            onOptionChange={setSelectedInterval}
          />
          <span className="mr-2">Select history:</span>

          <DropDownButton
            options={HISTORY}
            selectedOption={selectedHistory}
            onOptionChange={setSelectedHistory}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Button
            onClick={handleGeminiCall}
            type="big"
            disabled={!isMounted || isLoadingAIResponse}
          >
            {getButtonContent()}
          </Button>
        </div>
        <div className="mt-4 font-sans text-sm"     dangerouslySetInnerHTML={{ __html: formatAIOutput(aiOutput) }} />
      </div>
    </>
  );
}
