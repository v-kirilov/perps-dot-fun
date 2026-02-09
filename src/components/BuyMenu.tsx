"use client";

import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { useAccount } from "wagmi";
import config from "@/rainbowKitConfig";
import { getBalance } from "@wagmi/core";
import { formatUnits } from "viem";
import InputField from "./ui/InputField";
import { openPosition } from "@/app/lib/peprsMarket-service";
import toast from "react-hot-toast";
import { getOrCreateUser, openTrade } from "@/app/lib/data-service";

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
  const [isExecutingOrder, setIsExecutingOrder] = useState<boolean>(false);
  const [marginValue, setMarginValue] = useState<number>(1);
  const [traderId, setTraderId] = useState<number>(0);

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
        try {
          if (account.address) {
            const supabaseUser = await getOrCreateUser(
              account.address as `0x${string}`,
            );
            setTraderId(supabaseUser.id);
          }
        } catch (error) {
          toast.error("Failed to fetch or create user data", {
            position: "top-center",
          });
        }

        const bal = await getBalance(config, { address: account.address });
        // Use viem's formatUnits to convert BigInt to decimal string
        const formattedBalance = formatUnits(bal.value, bal.decimals);
        setBalance(parseFloat(formattedBalance));
      }
    }
    fetchBalance();
  }, [mounted, account.address]);

  async function handleExecutePosition(isLong: boolean) {
    setIsExecutingOrder(true);

    if (tradeAmount === "" || isNaN(parseFloat(tradeAmount))) {
      toast.error("Invalid trade amount", { position: "top-center" });
      setIsExecutingOrder(false);
      return;
    }
    try {
      console.log(BigInt(parseFloat(tradeAmount) * 10 ** 18));
      await openPosition(config, parseFloat(tradeAmount), marginValue, isLong);

      // save the trade in supabase
      await openTrade(
        traderId,
        parseFloat((parseFloat(tradeAmount) * assetPrice).toPrecision(3)),
        new Date(),
      );
    } catch (error) {
      console.error("Error executing order:", error);
      toast.error("Failed to execute order", { position: "top-center" });
    } finally {
      setIsExecutingOrder(false);
    }
  }

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
        <span className="mr-2 text-gray-400">
          {isNaN(parseFloat(tradeAmount))
            ? `$0.00`
            : `$${(parseFloat(tradeAmount) * assetPrice).toPrecision(3)}`}
        </span>
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
        <>
          <div className="slidecontainer mt-4 mx-2">
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={marginValue}
              onChange={(e) => setMarginValue(Number(e.target.value))}
              className="slider w-full"
              id="myRange"
            />
            <div className="text-center mt-2 text-gray-400">
              Margin: {marginValue.toFixed(1)}X
            </div>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <div className="flex justify-center w-full">
              <Button
                disabled={isExecutingOrder}
                onClick={() => handleExecutePosition(true)}
                type="buy"
              >
                BUY
              </Button>
            </div>
            <div className="flex justify-center w-full">
              <Button
                disabled={isExecutingOrder}
                onClick={() => handleExecutePosition(false)}
                type="sell"
              >
                SELL
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="m-2 text-white-500 text-2xl flex justify-center">
          Please connect your wallet to trade.
        </div>
      )}
    </>
  );
}
