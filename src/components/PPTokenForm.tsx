"use client";
import InputField from "./ui/InputField";
import { useEffect, useMemo, useState } from "react";
import {
  storageAbi,
  NUMBER_CONTRACT,
  PPTOKEN_ADDRESS,
  PPtokenABI,
} from "@/constants";
import {
  useChainId,
  useConfig,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useReadContract, useWriteContract } from "wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";
import { CgSpinner } from "react-icons/cg";
import Button from "./ui/Button";
import { ContractFunctionExecutionError } from "viem";
import toast from "react-hot-toast";
import { getDecimals, getBalance } from "@/app/lib/pptoken-service";
import {askGPT} from "@/app/lib/aiAnalyzer-service";
import { generateContentFromMLDev } from "@/app/lib/gemini-service";

export default function PPTokenForm() {
  const [userAddress, setUserAddress] = useState("");

  const [isApproved, setIsApproved] = useState(true);
  const [isMinted, setIsMinted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const config = useConfig();
  const account = useAccount();

  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleGetDecimals() {
    console.log("Accoutn", account);
    const decimals = await getDecimals(config);
    console.log("decimals", decimals);
  }

  async function handleGetBalance() {
    setIsMinted(false);

    const balance = await getBalance(config, account.address!);
    console.log("balance", balance);
    setIsMinted(true);
  }

  async function handleGeminiCall() {
    await generateContentFromMLDev();
  }

  async function handleGetBalance123() {
    // started approval
    try {
      setIsApproved(false);
      const approvalHash = await writeContractAsync({
        abi: storageAbi,
        address: NUMBER_CONTRACT as `0x${string}`,
        functionName: "store",
        args: [BigInt(userAddress)],
      });
      console.log("approvalHash", approvalHash);
      setIsApproved(true);
      setIsMinted(false);

      // approval received
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash,
      });
      console.log("approvalReceipt", approvalReceipt);
      // transaction mined
      setIsApproved(true);
      setIsMinted(true);
    } catch (error: any) {
      console.error("Error setting number:", error);

      setIsApproved(true);
      setIsMinted(true);

      if (error instanceof ContractFunctionExecutionError) {
        toast.error("Transaction was rejected by user");
        console.log("Transaction was rejected by user");
      }
    }
  }

  function getButtonContent() {
    if (!isMounted) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <span>Loading...</span>
        </div>
      );
    }

    if (!account.isConnected) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <span>Please connect your wallet</span>
        </div>
      );
    }

    if (!isApproved) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <CgSpinner className="animate-spin" size={20} />
          <span>Confirming in wallet...</span>
        </div>
      );
    }
    if (!isMinted) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <CgSpinner className="animate-spin" size={20} />
          <span>Waiting for confirmation...</span>
        </div>
      );
    }
    if (isApproved && isMinted) {
      return (
        <div className="flex items-center justify-center gap-2 w-full">
          <span>Get Balance</span>
        </div>
      );
    }
  }

  return (
    <div>
      <InputField
        label="User address"
        placeholder="Set a number"
        value={userAddress.toString()}
        large={false}
        onChange={(e) => setUserAddress(e.target.value.toString())}
      />
      <div className="flex mt-4">
        <div className="flex justify-center ">
          <Button
            disabled={
              !isMounted || !account.isConnected || !isApproved || !isMinted
            }
            onClick={handleGetDecimals}
            type="normal"
          >
            Get decimals
          </Button>
        </div>

        <div className=" flex justify-center">
          <Button
            disabled={
              !isMounted || !account.isConnected || !isApproved || !isMinted
            }
            onClick={handleGetBalance}
            type="small"
          >
            {getButtonContent()}
          </Button>
        </div>
        <div className="justify-center">
          <Button
            disabled={
              !isMounted || !account.isConnected || !isApproved || !isMinted
            }
            onClick={handleGetBalance}
            type="buy"
          >
            BUY
          </Button>
        </div>
        <div className="justify-center">
          <Button
            disabled={
              !isMounted || !account.isConnected || !isApproved || !isMinted
            }
            onClick={handleGeminiCall}
            type="sell"
          >
            SELL
          </Button>
        </div>
      </div>
    </div>
  );
}
