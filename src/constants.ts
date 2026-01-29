// interface ContractsConfig {
//     [chainId: number]: {
//         tsender: string
//         no_check: string | null
//     }
// }

export const PPTOKEN_ADDRESS = "0x63486d0a5d1CCae7a8EC7EE02D4e581E8604e872";
export const NUMBER_CONTRACT = "0x97Da566b1d15b622ef8ac5b5A3D8A5509A6A9A80";
export const PERPS_MARKET_ADDRESS = "0x221f314Bc31e5589F546648d3ab20b3dEB1CD8B8";

export const storageAbi = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];


export const PPtokenABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];


export const PERPS_MARKET_ABI = [{"inputs":[{"internalType":"address","name":"_feeCollector","type":"address"},{"internalType":"address","name":"_campaignAddress","type":"address"},{"internalType":"address","name":"_feePrizeToken","type":"address"},{"internalType":"address","name":"_priceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"inputs":[],"name":"LeverageExceded","type":"error"},{"inputs":[],"name":"NoETHProvided","type":"error"},{"inputs":[],"name":"NoProfit","type":"error"},{"inputs":[],"name":"NotPossible","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"PositionAmountIsTooSmall","type":"error"},{"inputs":[],"name":"PositionNotExisting","type":"error"},{"inputs":[],"name":"TransferFailed","type":"error"},{"inputs":[],"name":"UserBlackListed","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"Fee","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_POSITION_AMOUNT","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PriceFeed","outputs":[{"internalType":"contract VPriceFeed","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userToBlackList","type":"address"}],"name":"blackListUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"blackListedUsers","outputs":[{"internalType":"bool","name":"isBlacklisted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkIfCampaignActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"closePosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"positionAddress","type":"address"}],"name":"getPosition","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amountDeposited","type":"uint256"},{"internalType":"uint256","name":"positionAmount","type":"uint256"},{"internalType":"enum PerpsMarket.PositionType","name":"positionType","type":"uint8"},{"internalType":"uint256","name":"positionEntryPrice","type":"uint256"},{"internalType":"uint256","name":"positionLiquidationPrice","type":"uint256"},{"internalType":"uint256","name":"positionLeverage","type":"uint256"}],"internalType":"struct PerpsMarket.Position","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsersWithPositions","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdatedTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"positionOwner","type":"address"}],"name":"liquidatePosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isLong","type":"bool"}],"name":"openPosition","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"positionProfit","outputs":[{"internalType":"uint256","name":"profit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"positions","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amountDeposited","type":"uint256"},{"internalType":"uint256","name":"positionAmount","type":"uint256"},{"internalType":"enum PerpsMarket.PositionType","name":"positionType","type":"uint8"},{"internalType":"uint256","name":"positionEntryPrice","type":"uint256"},{"internalType":"uint256","name":"positionLiquidationPrice","type":"uint256"},{"internalType":"uint256","name":"positionLeverage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_campaignAddress","type":"address"}],"name":"setNewCampaignAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeCollector","type":"address"}],"name":"setNewFeeCollectorAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"deposit","type":"uint256"}],"name":"updatePositions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawProfit","outputs":[],"stateMutability":"nonpayable","type":"function"}]