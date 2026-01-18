// interface ContractsConfig {
//     [chainId: number]: {
//         tsender: string
//         no_check: string | null
//     }
// }

export const NUMBER_CONTRACT = "0x97Da566b1d15b622ef8ac5b5A3D8A5509A6A9A80";

export const storageAbi =[
    	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]