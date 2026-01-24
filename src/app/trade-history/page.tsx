import AccountGuard from "@/components/AccountGuard";
import Spinner from "@/components/Spinner";
import TradeList from "@/components/TradeList";
import { Suspense } from "react";

export default function Trades() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <div>
          <AccountGuard>
            <TradeList />
          </AccountGuard>
      </div>
    </div>
  );
}
