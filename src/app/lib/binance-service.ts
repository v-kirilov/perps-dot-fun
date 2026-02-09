import type {
  CandlestickData,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";

export async function getETHPrice(symbol = "ETHUSDT"): Promise<number> {
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance error: ${res.status}`);
  const data = (await res.json()) as { symbol: string; price: string };
  return parseFloat(data.price);
}

export async function fetchLastNCandles(
  interval = "1h",
  limit = 50,
  symbol = "ETHUSDT",
): Promise<CandlestickData[]> {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance error: ${res.status}`);
  const klines = (await res.json()) as any[]; // Binance kline array
  return klines.map((k) => ({
    time: Math.floor(k[0] / 1000) as UTCTimestamp,
    open: parseFloat(k[1]),
    high: parseFloat(k[2]),
    low: parseFloat(k[3]),
    close: parseFloat(k[4]),
  }));
}
