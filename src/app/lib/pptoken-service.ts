import { PPTOKEN_ADDRESS, PPtokenABI } from "@/constants";
import type { Config } from "@wagmi/core";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";

export async function getDecimals(config: Config): Promise<number> {
  if (!PPTOKEN_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  const response = await readContract(config, {
    abi: PPtokenABI,
    address: PPTOKEN_ADDRESS as `0x${string}`,
    functionName: "decimals",
    //args: [account.address!, tSenderAddress],
    args: [],
  });
  return Number(response);
}

export async function getBalance(config: Config, wallet: string): Promise<number> {
  if (!PPTOKEN_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  const response = await readContract(config, {
    abi: PPtokenABI,
    address: PPTOKEN_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    args: [wallet],
  });
  return Number(response);
}
