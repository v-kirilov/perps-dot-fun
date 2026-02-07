"use server";

export const fetchTransaction = async (txHash:string, chainId:string) => {
    const apiKey = process.env.ETHERSCAN_API_KEY;

  const response = await fetch(
    `https://api.etherscan.io/v2/api?chainid=${chainId}&module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${apiKey}`
  );
  const data = await response.json();
  console.log(data.result);
  console.log(data);
  //return data.result;
}; // https://api.etherscan.io/v2/api?chainid=1&action=balance&apikey=YourEtherscanApiKey