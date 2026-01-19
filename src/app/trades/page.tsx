import Spinner from "@/components/Spinner";
import TradeList from "@/components/TradeList";
import { Suspense } from "react";

export default function Trades() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your trades data.
      </h2>
      <div>
        <Suspense fallback={<Spinner />}>
          <TradeList />
        </Suspense>
      </div>
    </div>
  );
}
