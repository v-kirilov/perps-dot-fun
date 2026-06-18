export type WatchlistMarketConfig = {
  pair: string;
  symbol: string;
};

export type WatchlistMarket = WatchlistMarketConfig & {
  price: number | null;
  change: number | null;
};

type BinanceTicker24h = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
};

export const WATCHLIST_MARKETS: WatchlistMarketConfig[] = [
  { pair: "ETH-PERP", symbol: "ETHUSDT" },
  { pair: "BTC-PERP", symbol: "BTCUSDT" },
  { pair: "SOL-PERP", symbol: "SOLUSDT" },
];

export function createEmptyWatchlist(): WatchlistMarket[] {
  return WATCHLIST_MARKETS.map((market) => ({
    ...market,
    price: null,
    change: null,
  }));
}

export async function fetchWatchlistMarkets(): Promise<WatchlistMarket[]> {
  const symbols = WATCHLIST_MARKETS.map((market) => market.symbol);
  const response = await fetch(
    `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(
      JSON.stringify(symbols),
    )}`,
  );

  if (!response.ok) {
    throw new Error(`Binance error: ${response.status}`);
  }

  const tickers = (await response.json()) as BinanceTicker24h[];
  const tickerBySymbol = new Map(
    tickers.map((ticker) => [ticker.symbol, ticker]),
  );

  return WATCHLIST_MARKETS.map((market) => {
    const ticker = tickerBySymbol.get(market.symbol);

    return {
      ...market,
      price: ticker ? Number(ticker.lastPrice) : null,
      change: ticker ? Number(ticker.priceChangePercent) : null,
    };
  });
}
