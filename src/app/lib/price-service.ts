// Utility to fetch ETH price from Binance public API
export async function fetchEthPrice(): Promise<number> {
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");
    if (!res.ok) return 0;
    const data = await res.json();
    return parseFloat(data.price);
  } catch (e) {
    return 0;
  }
}

// Utility to fetch ETH price from Binance public API
export async function fetchBtcPrice(): Promise<number > {
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
    if (!res.ok) return 0;
    const data = await res.json();
    return parseFloat(data.price);
  } catch (e) {
    return 0;
  }
}
