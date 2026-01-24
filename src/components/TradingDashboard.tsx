"use client";

import { useState } from "react";
import Chart from "@/components/Chart";
import OrderBook from "@/components/OrderBook";
import BuyMenu from "./BuyMenu";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT"] as const;
export type SymbolType = (typeof SYMBOLS)[number];

export default function TradingDashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolType>("BTCUSDT");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
      <div className="lg:col-span-2 min-h-0">
        <Chart
          symbols={SYMBOLS}
          selectedSymbol={selectedSymbol}
          onSymbolChange={setSelectedSymbol}
        />
      </div>
      <div className="min-h-0 overflow-auto">
        <OrderBook
          symbols={SYMBOLS}
          selectedSymbol={selectedSymbol}
          onSymbolChange={setSelectedSymbol}
        />
        <div>
          <BuyMenu />
        </div>
      </div>
    </div>
  );
}
