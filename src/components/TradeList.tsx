"use client";
import { useState, useEffect } from "react";
import { Trade, getTrades } from "../app/lib/data-service";
import TradeRow from "./TradeRow";

function TradeList({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrades = async () => {
    try {
      console.log("Fetching trades from Supabase...");
      const data = await getTrades();
      setTrades(data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="bg-[#131722] rounded-lg p-8 text-center text-gray-400">
        Loading trades...
      </div>
    );
  }

  if (!trades || trades.length === 0) {
    return (
      <div className="bg-[#131722] rounded-lg p-8 text-center text-gray-400">
        No trades found
      </div>
    );
  }

  return (
    <div className="bg-[#131722] rounded-lg overflow-hidden w-full max-w-full">
      <div className="px-4 py-3 border-b border-[#1f2943]">
        <h2 className="text-lg font-semibold text-white">Recent Trades</h2>
      </div>
      <div className="overflow-x-auto w-full max-w-full">
        <table className="w-full max-w-full">
          <thead className="bg-[#1a1f2e]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opened
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Closed
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ETH Amount
              </th>
                     <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entry Price
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2943]">
            {trades.map((trade: Trade) => (
              <TradeRow key={trade.id} trade={trade} onTradeUpdate={fetchTrades} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradeList;
