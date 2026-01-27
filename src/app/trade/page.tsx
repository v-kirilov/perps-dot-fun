import TradingDashboard from "@/components/TradingDashboard";
import { fetchEthPrice, fetchBtcPrice } from "../lib/price-service";
import AITrader from "@/components/AITrader";

export default async function Page() {
  const ethPrice : number = await fetchEthPrice().then();
  const btcPrice : number = await fetchBtcPrice().then();

  return (
    <>
    <div className="px-10">
      <TradingDashboard ethPrice={ethPrice} btcPrice={btcPrice} />
    </div>
    <div>
      <AITrader />
    </div>
    </>
  );
}
