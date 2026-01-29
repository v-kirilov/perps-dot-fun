import {
  PPTOKEN_ADDRESS,
  PPtokenABI,
  PERPS_MARKET_ADDRESS,
  PERPS_MARKET_ABI,
} from "@/constants";
import type { Config } from "@wagmi/core";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";

export async function getFees(config: Config): Promise<number> {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  const response = await readContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "Fee",
    //args: [account.address!, tSenderAddress],
    args: [],
  });
  return Number(response);
}

export async function isUserBlacklisted(
  config: Config,
  wallet: string,
): Promise<Boolean> {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return false;
  }

  const response = await readContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "blackListedUsers",
    args: [wallet],
  });
  return Boolean(response);
}

export async function getUserPosition(
  config: Config,
  wallet: string,
): Promise<number> {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  const response = await readContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "getPosition",
    args: [wallet],
  });
  return Number(response);
}

export async function getUserPositionProfit(
  config: Config,
  wallet: string,
): Promise<number> {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  const response = await readContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "positionProfit",
    args: [wallet],
  });
  return Number(response);
}

interface PositionDetails {
  positionAmount: number;
  positionEntryPrice: number;
  profit: number;
  amountDeposited: number;
  positionType: number;
  positionLiquidationPrice: number;
  positionLeverage: number;
}

export async function getUserActivePosition(
  config: Config,
  wallet: string,
): Promise<PositionDetails> {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return {
      positionAmount: 0,
      positionEntryPrice: 0,
      profit: 0,
      amountDeposited: 0,
      positionType: 0,
      positionLiquidationPrice: 0,
      positionLeverage: 0,
    };
  }

  const response = await readContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "positions",
    args: [wallet],
  });
  console.log("Position Details:", response);
  return {
    positionAmount: 0,
    positionEntryPrice: 0,
    profit: 0,
    amountDeposited: 0,
    positionType: 0,
    positionLiquidationPrice: 0,
    positionLeverage: 0,
  };
}

export async function getMinPositionAmount(config: Config): Promise<number> {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  const response = await readContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "MIN_POSITION_AMOUNT",
  });
  return Number(response);
}

export async function openPosition(
  config: Config,
  amount: number,
  margin: number,
  isLong: boolean,
) {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  console.log("Opening position with params:", { amount, margin, isLong });
  const tradedValue = BigInt(amount * 10 ** 18 * margin);
  const ethValue = BigInt(amount * 10 ** 18);
  const response = await writeContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "openPosition",
    args: [tradedValue, isLong],
    value: ethValue, // assuming amount is in ETH and converting to wei
  });
  console.log("Transaction hash:", response);
  //return Number(response);
}

export async function checkIfCampaignIsActive(
  config: Config,

) {
  if (!PERPS_MARKET_ADDRESS) {
    alert("Contract not deployed yet");
    return 0;
  }

  const response = await readContract(config, {
    abi: PERPS_MARKET_ABI,
    address: PERPS_MARKET_ADDRESS as `0x${string}`,
    functionName: "checkIfCampaignActive",
  });
  console.log("Transaction hash:", response);
}
