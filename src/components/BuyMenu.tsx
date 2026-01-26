"use client";

import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { useAccount } from "wagmi";
import config from "@/rainbowKitConfig";
import { getBalance } from "@wagmi/core";
import { formatUnits } from "viem";
import InputField from "./ui/InputField";

export default function BuyMenu({
  selectedSymbol,
  assetPrice,
}: {
  selectedSymbol: string;
  assetPrice: number;
}) {
  const account = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [tradeAmount, setTradeAmount] = useState<string>("");

  function setTradeAmountWithLimit(value: string) {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue > balance) {
      setTradeAmount(balance.toString());
    } else {
      setTradeAmount(value);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (mounted && account.address) {
        const bal = await getBalance(config, { address: account.address });
        console.log("Account:", account);
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
      <div className="flex justify-between">
        <span className="ml-2 text-gray-400 ">Set amount:</span>
        <span className="mr-2 text-gray-400">{isNaN(parseFloat(tradeAmount)) ? `$0.00` : `$${(parseFloat(tradeAmount)*assetPrice).toPrecision(3)}`}</span>
      </div>
      <div className="ml-2 mr-2">
        <InputField
          label={""}
          placeholder={`Max ${balance.toPrecision(4)}`}
          type="number"
          large={false}
          onChange={(e) => setTradeAmountWithLimit(e.target.value)}
          value={tradeAmount}
          maxAmount={balance}
          minAmount={0}
          step={parseFloat((balance * 0.1).toPrecision(2))}
        />
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
