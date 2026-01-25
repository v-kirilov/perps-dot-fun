import AccountGuard from "@/components/AccountGuard";

import TradeList from "@/components/TradeList";


export default function Page() {
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
