"use client";

import { useAccount } from "wagmi";
import { ReactNode } from "react";

interface AccountGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AccountGuard({
  children,
  fallback,
}: AccountGuardProps) {
  const account = useAccount();
  if (!account.address) {
    return (
      <div className="flex items-center justify-center py-10">
        <span> Please Connect Your Wallet </span>
      </div>
    );
  }

  if (!account.address) {
    return (
      <>
        {fallback || (
          <h2 className="text-3xl font-semibold text-center">
            Sign in to access your profile information.
          </h2>
        )}
      </>
    );
  }

  return <>{children}</>;
}
