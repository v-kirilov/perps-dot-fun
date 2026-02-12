"use client";

import { useAccount } from "wagmi";
import { ReactNode, useEffect, useState } from "react";

interface AccountGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AccountGuard({
  children,
  fallback,
}: AccountGuardProps) {
  const account = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering content until mounted
  if (!isMounted) {
    return (
      <div className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed text-center">
        Loading...
      </div>
    );
  }

  if (!account.address) {
    return (
      <div className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed text-center">
        Please connect your wallet!
      </div>
    );
  }

  return <>{children}</>;
}
