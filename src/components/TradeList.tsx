import { supabase } from "@/app/lib/supabase";
import { User, Trade, getTrades } from "../app/lib/data-service";

async function TradeList() {
  console.log("Fetching users from Supabase...");
  const trades: Trade[] = await getTrades();

  if (!trades || trades.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div>
      Trades:
      {trades.map((trade: Trade) => (
        <div key={trade.id}>
          {trade.id}
          {trade.created_at.toString()}
        </div>
      ))}
    </div>
  );
}

export default TradeList;
