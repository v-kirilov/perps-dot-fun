"use client";

import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { useAccount } from "wagmi";
import config from "@/rainbowKitConfig";
import { getBalance } from '@wagmi/core';
import { formatUnits } from 'viem';

export default function BuyMenu() {
  const account = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (mounted && account.address) {
        const bal = await getBalance(config, { address: account.address });
        console.log("Balance:", bal);
        // Use viem's formatUnits to convert BigInt to decimal string
        const formattedBalance = formatUnits(bal.value, bal.decimals);
        setBalance(parseFloat(formattedBalance));
      }
    }
    fetchBalance();
  }, [mounted, account.address]);

  // Before mount, render a neutral state that matches server render
  const isConnected = mounted && account.address;

  return (
    <>
      <div className="flex justify-between">
        <span className="m-2 text-gray-400 ">Available (ETH):</span>
        <span className="m-2 text-gray-400">{balance.toPrecision(4)}</span>
      </div>
      {isConnected ? (
        <div className="grid grid-cols-2 mt-2">
          <div className="flex justify-center w-full">
            <Button disabled={false} onClick={() => {}} type="buy">
              BUY
            </Button>
          </div>
          <div className="flex justify-center w-full">
            <Button disabled={false} onClick={() => {}} type="sell">
              SELL
            </Button>
          </div>
        </div>
      ) : (
        <div className="m-2 text-white-500 text-2xl flex justify-center">
          Please connect your wallet to trade.
        </div>
      )}
    </>
  );
}
