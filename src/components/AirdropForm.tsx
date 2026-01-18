"use client";
import InputField from "./ui/InputField";
import { useEffect, useMemo, useState } from "react";
import {

  storageAbi,
  NUMBER_CONTRACT,
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

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const [storageNumber, setStorageNumber] = useState(0);

  const [isApproved, setIsApproved] = useState(true);
  const [isMinted, setIsMinted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const total: number = useMemo(() => calculateTotal(amounts), [amounts]);

  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({ confirmations: 1, hash: hash });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function getNumber(): Promise<number> {
    if (!NUMBER_CONTRACT) {
      alert("Contract not deployed yet");
      return 0;
    }
    // read from the chain if we have approved enough tokens
    // allowance
    const response = await readContract(config, {
      abi: storageAbi,
      address: NUMBER_CONTRACT as `0x${string}`,
      functionName: "retrieve",
      //args: [account.address!, tSenderAddress],
      args: [],
    });
    console.log("response", Number(response));
    return Number(response);
  }

  async function handleGetNumber() {
    // Storage address  0x97Da566b1d15b622ef8ac5b5A3D8A5509A6A9A80
    //1. approve our tsender contract to send our tokens
    //1. if approved mot to step 2
    //2. call the airdopr function on the tsender contract
    //3 wait for the transaction to be mined

    //const tSenderAddress1 = chainsToTSender[chainId]["tsender"];
    const approvedAmount = await getNumber();
  }

  async function handleSetNumber() {
    try {
      const hash = await writeContract(config, {
        abi: storageAbi,
        address: NUMBER_CONTRACT as `0x${string}`,
        functionName: "store",
        args: [BigInt(42)], // replace 42 with the number you want to store
      });
      console.log("Transaction hash:", hash);
    } catch (error) {
      console.error("Error setting number:", error);
    }
  }

  async function handleSetNumberAsync() {
    // started approval
    setIsApproved(false);
    const approvalHash = await writeContractAsync({
      abi: storageAbi,
      address: NUMBER_CONTRACT as `0x${string}`,
      functionName: "store",
      args: [BigInt(storageNumber)],
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
          <span>Set Number</span>
        </div>
      );
    }
  }

  return (
    <div>
      <InputField
        label="Number"
        placeholder="Set a number"
        type="number"
        value={storageNumber.toString()}
        large={false}
        onChange={(e) => setStorageNumber(Number(e.target.value))}
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleGetNumber}
          className="flex-1 mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Get number
        </button>

        <button
          disabled={!isMounted || !account.isConnected || !isApproved || !isMinted}
          onClick={() => handleSetNumberAsync()}
          className="flex-1 mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
}
