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
      <h1 className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed text-center">
        Please connect your wallet!
      </h1>
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
