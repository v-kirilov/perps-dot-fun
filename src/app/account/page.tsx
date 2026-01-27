import PPTokenForm from "@/components/PPTokenForm";
import AccountGuard from "@/components/AccountGuard";
import AITrader from "@/components/AITrader";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <AccountGuard>
        <PPTokenForm />
        <AITrader />
      </AccountGuard>
    </div>
  );
}
