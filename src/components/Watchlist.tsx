"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  createEmptyWatchlist,
  fetchWatchlistMarkets,
} from "@/app/lib/watchlist-service";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatPrice(price: number | null) {
  if (price === null) {
    return "--";
  }

  return currencyFormatter.format(price);
}

function formatChange(change: number | null) {
  if (change === null) {
    return "--";
  }

  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

export default function Watchlist() {
  const [markets, setMarkets] = useState(createEmptyWatchlist);

  useEffect(() => {
    let isMounted = true;

    async function fetchMarkets() {
      try {
        const nextMarkets = await fetchWatchlistMarkets();

        if (!isMounted) {
          return;
        }

        setMarkets(nextMarkets);
      } catch (error) {
        console.error("Error fetching watchlist prices:", error);
      }
    }

    fetchMarkets();
    const intervalId = window.setInterval(fetchMarkets, 30_000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="border-y border-white/10 bg-[#0b1117] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">
            Watchlist
          </h2>
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <span className="animate-pulse-ring h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Live Binance prices
          </span>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {markets.map((market) => (
            <Link
              key={market.pair}
              href="/trade"
              className="group bg-[#0b1117] p-5 transition hover:bg-[#111923]"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-white">
                  {market.pair}
                </span>
                <span
                  className={
                    (market.change ?? 0) >= 0
                      ? "font-mono text-sm text-emerald-300"
                      : "font-mono text-sm text-rose-300"
                  }
                >
                  {formatChange(market.change)}
                </span>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <span className="font-mono text-2xl text-slate-200">
                  {formatPrice(market.price)}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition group-hover:text-slate-300">
                  Trade
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
