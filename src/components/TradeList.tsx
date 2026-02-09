import { Trade, getTrades } from "../app/lib/data-service";
import TradeRow from "./TradeRow";

async function TradeList() {
  console.log("Fetching trades from Supabase...");
  const trades: Trade[] = await getTrades();

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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2943]">
            {trades.map((trade: Trade) => (
              <TradeRow key={trade.id} trade={trade} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradeList;
