import AccountGuard from "@/components/AccountGuard";

import TradeList from "@/components/TradeList";


export default function Page() {
  return (
    <div className="flex flex-col mt-10 w-full">
      <AccountGuard>
        <TradeList />
      </AccountGuard>
    </div>
  );
}
