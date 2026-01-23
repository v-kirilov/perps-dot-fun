import PPTokenForm from "@/components/PPTokenForm";
import AccountGuard from "@/components/AccountGuard";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <AccountGuard>
        <PPTokenForm />
      </AccountGuard>
    </div>
  );
}
