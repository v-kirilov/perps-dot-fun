"use client";

import { useEffect, useState } from "react";
import TradingDashboard from "@/components/TradingDashboard";
import { fetchEthPrice } from "../lib/price-service";
import TradeList from "@/components/TradeList";
import AccountGuard from "@/components/AccountGuard";
import { getETHPrice } from "../lib/binance-service";
import { fetch24hStats } from "../lib/binance-service";
import toast from "react-hot-toast";

export default function Page() {
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [priceChange24h, setPriceChange24h] = useState<number>(0);
  const [high24h, setHigh24h] = useState<number>(0);
  const [low24h, setLow24h] = useState<number>(0);
  const [volume24h, setVolume24h] = useState<number>(0);

  useEffect(() => {
    async function fetchPrices() {
      const eth = await fetchEthPrice();
      setEthPrice(eth);
    }

    // Fetch 24h statistics
    async function fetchETHPriceStats() {
      try {
        const data = await fetch24hStats();
        console.log("24h Stats:", data);
        setPriceChange24h(parseFloat(data.priceChangePercent));
        setHigh24h(parseFloat(data.highPrice));
        setLow24h(parseFloat(data.lowPrice));
        setVolume24h(parseFloat(data.volume));
      } catch (error) {
        console.error("Error fetching 24h stats:", error);
        toast.error("Failed to fetch 24h statistics. Please refresh.");
      }
    }

    fetchPrices();
    fetchETHPriceStats();

    // Update every 30 seconds
    const interval = setInterval(() => {
      fetchPrices();
      fetchETHPriceStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleTradeCreated = () => {
    // Trigger trade list refresh by incrementing counter
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#131722] to-[#0a0e1a]">
      {/* Market Overview Header */}
      <div className="px-10 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          {/* Asset Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Ξ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                ETH-PERP
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  PERPETUAL
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                Ethereum Perpetual Futures
              </p>
            </div>
          </div>

          {/* Quick Stats Badge */}
          <div className="flex items-center gap-4">
            <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xs text-gray-400 mb-1">24h Volume</div>
              <div className="text-lg font-semibold text-white">
                {volume24h.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                ETH
              </div>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xs text-gray-400 mb-1">Funding Rate</div>
              <div className="text-lg font-semibold text-green-400">+0.01%</div>
            </div>
          </div>
        </div>

        {/* Live Price Ticker */}
        <div className="bg-gradient-to-r from-[#1a1f2e] to-[#131722] rounded-2xl border border-white/10 p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Current Price */}
            <div className="flex flex-col justify-center">
              <div className="text-sm text-gray-400 mb-2">Mark Price</div>
              <div className="text-3xl font-bold text-white mb-1">
                $
                {ethPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div
                className={`text-sm font-semibold ${priceChange24h >= 0 ? "text-green-400" : "text-red-400"} flex items-center gap-1`}
              >
                {priceChange24h >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(priceChange24h).toFixed(2)}%
                <span className="text-xs text-gray-500">(24h)</span>
              </div>
            </div>

            {/* 24h High */}
            <div className="flex flex-col justify-center border-l border-white/10 pl-8">
              <div className="text-sm text-gray-400 mb-2">24h High</div>
              <div className="text-3xl font-semibold text-green-400">
                $
                {high24h.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            {/* 24h Low */}
            <div className="flex flex-col justify-center border-l border-white/10 pl-8">
              <div className="text-sm text-gray-400 mb-2">24h Low</div>
              <div className="text-3xl font-semibold text-red-400">
                $
                {low24h.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            {/* Open Interest */}
            <div className="flex flex-col justify-center border-l border-white/10 pl-8">
              <div className="text-sm text-gray-400 mb-2">Open Interest</div>
              <div className="text-3xl font-semibold text-white">
                {(volume24h * 0.3).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                ETH
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ≈ $
                {(volume24h * 0.3 * ethPrice).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Interface */}
      <div className="px-10">
        <TradingDashboard
          ethPrice={ethPrice}
          onTradeCreated={handleTradeCreated}
        />
      </div>

      {/* Trade History */}
      <div className="px-10 py-5">
        <AccountGuard>
          <TradeList refreshTrigger={refreshTrigger} isTradeWindow={true} />
        </AccountGuard>
      </div>
    </div>
  );
}
