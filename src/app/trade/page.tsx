"use client";

import { useEffect, useState } from "react";
import TradingDashboard from "@/components/TradingDashboard";
import { fetchEthPrice } from "../lib/price-service";
import TradeList from "@/components/TradeList";
import AccountGuard from "@/components/AccountGuard";

export default function Page() {
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    async function fetchPrices() {
      const eth = await fetchEthPrice();
      setEthPrice(eth);
    }
    fetchPrices();
  }, []);

  const handleTradeCreated = () => {
    // Trigger trade list refresh by incrementing counter
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <div className="px-10">
        <TradingDashboard 
          ethPrice={ethPrice} 
          onTradeCreated={handleTradeCreated}
        />
      </div>
      <div className="px-10 py-5">
        <AccountGuard>
          <TradeList refreshTrigger={refreshTrigger} isTradeWindow={true} />
        </AccountGuard>
      </div>
    </>
  );
}
