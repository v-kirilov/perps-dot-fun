"use client";

import { useState } from "react";
import AirdropForm from "@/components/AirdropForm";
import Chart from "@/components/Chart";
import OrderBook from "@/components/OrderBook";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT"] as const;
export type SymbolType = (typeof SYMBOLS)[number];

export default function Home() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolType>("BTCUSDT");

  return (
    <div className="px-10">
      <div className="flex gap-4 h-[600px] items-stretch">
        <div className="flex-1">
          <Chart
            symbols={SYMBOLS}
            selectedSymbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
          />
        </div>
        <div className="w-96 flex-shrink-0">
          <OrderBook
            symbols={SYMBOLS}
            selectedSymbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
          />
        </div>
      </div>
    </div>
  );
}