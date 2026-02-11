"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";

// ============================================
// BINANCE ORDER BOOK CONFIGURATION
// ============================================

const DEPTH_LIMIT = 6; // Number of price levels to show

const getRestUrl = (symbol: string) =>
  `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${DEPTH_LIMIT}`;

const getWsUrl = (symbol: string) =>
  `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth@100ms`;

interface OrderBookEntry {
  price: string;
  quantity: string;
  total: number;
}

interface OrderBookData {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  lastUpdateId: number;
}

interface BinanceDepthSnapshot {
  lastUpdateId: number;
  bids: [string, string][]; // [price, quantity]
  asks: [string, string][];
}

interface BinanceDepthUpdate {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  U: number; // First update ID
  u: number; // Final update ID
  b: [string, string][]; // Bids to update
  a: [string, string][]; // Asks to update
}

function processOrders(
  orders: [string, string][],
  isAsk: boolean,
): OrderBookEntry[] {
  const processed = orders
    .map(([price, quantity]) => ({
      price,
      quantity,
      total: parseFloat(price) * parseFloat(quantity),
    }))
    .filter((order) => parseFloat(order.quantity) > 0);

  // Sort asks ascending (lowest first), bids descending (highest first)
  return processed.sort((a, b) =>
    isAsk
      ? parseFloat(a.price) - parseFloat(b.price)
      : parseFloat(b.price) - parseFloat(a.price),
  );
}

function formatPrice(price: string): string {
  const num = parseFloat(price);
  return num >= 1 ? num.toFixed(2) : num.toFixed(6);
}

function formatQuantity(quantity: string): string {
  const num = parseFloat(quantity);
  return num >= 1 ? num.toFixed(4) : num.toFixed(6);
}

interface OrderBookProps<T extends string> {
  symbols: readonly T[];
  selectedSymbol: T;
  onSymbolChange: (symbol: T) => void;
}

export default function OrderBook<T extends string>({
  symbols,
  selectedSymbol,
  onSymbolChange,
}: OrderBookProps<T>) {
  const [orderBook, setOrderBook] = useState<OrderBookData>({
    bids: [],
    asks: [],
    lastUpdateId: 0,
  });
  const [spread, setSpread] = useState<{ value: number; percentage: number }>({
    value: 0,
    percentage: 0,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const orderBookRef = useRef<Map<string, string>>(new Map());
  const asksRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    let isDisposed = false;
    let reconnectTimeout: NodeJS.Timeout;

    async function fetchSnapshot() {
      const response = await fetch(getRestUrl(selectedSymbol));
      const data: BinanceDepthSnapshot = await response.json();
      return data;
    }

    function updateOrderBook() {
      const bids = processOrders(
        Array.from(orderBookRef.current.entries()),
        false,
      ).slice(0, DEPTH_LIMIT);
      const asks = processOrders(
        Array.from(asksRef.current.entries()),
        true,
      ).slice(0, DEPTH_LIMIT);

      // Calculate spread
      if (asks.length > 0 && bids.length > 0) {
        const lowestAsk = parseFloat(asks[0].price);
        const highestBid = parseFloat(bids[0].price);
        const spreadValue = lowestAsk - highestBid;
        const spreadPercentage = (spreadValue / lowestAsk) * 100;
        setSpread({ value: spreadValue, percentage: spreadPercentage });
      }

      setOrderBook((prev) => ({ ...prev, bids, asks }));
    }

    function connectWebSocket() {
      if (isDisposed) return;

      wsRef.current?.close();

      const ws = new WebSocket(getWsUrl(selectedSymbol));
      wsRef.current = ws;

      ws.onopen = () =>
        console.log(`OrderBook WebSocket connected (${selectedSymbol})`);

      ws.onmessage = (event) => {
        if (isDisposed) return;

        const msg: BinanceDepthUpdate = JSON.parse(event.data);

        // Update bids
        for (const [price, quantity] of msg.b) {
          if (parseFloat(quantity) === 0) {
            orderBookRef.current.delete(price);
          } else {
            orderBookRef.current.set(price, quantity);
          }
        }

        // Update asks
        for (const [price, quantity] of msg.a) {
          if (parseFloat(quantity) === 0) {
            asksRef.current.delete(price);
          } else {
            asksRef.current.set(price, quantity);
          }
        }

        updateOrderBook();
      };

      ws.onclose = () => {
        if (isDisposed) return;
        console.log("OrderBook WebSocket closed, reconnecting...");
        reconnectTimeout = setTimeout(connectWebSocket, 1000);
      };

      ws.onerror = (error) =>
        console.error("OrderBook WebSocket error:", error);
    }

    async function init() {
      if (isDisposed) return;

      // Clear previous data
      orderBookRef.current.clear();
      asksRef.current.clear();

      console.log(`Fetching order book snapshot for ${selectedSymbol}...`);
      const snapshot = await fetchSnapshot();

      if (isDisposed) return;

      // Initialize maps with snapshot data
      for (const [price, quantity] of snapshot.bids) {
        orderBookRef.current.set(price, quantity);
      }
      for (const [price, quantity] of snapshot.asks) {
        asksRef.current.set(price, quantity);
      }

      setOrderBook((prev) => ({
        ...prev,
        lastUpdateId: snapshot.lastUpdateId,
      }));
      updateOrderBook();

      connectWebSocket();
    }

    init().catch(console.error);

    return () => {
      isDisposed = true;
      clearTimeout(reconnectTimeout);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [selectedSymbol]);

  const maxBidTotal = Math.max(...orderBook.bids.map((b) => b.total), 1);
  const maxAskTotal = Math.max(...orderBook.asks.map((a) => a.total), 1);

  return (
    <>
      <div className="bg-[#131722] rounded-lg p-4 text-[#d1d4dc] w-full ">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Order Book</h2>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-3 text-xs text-gray-500 mb-2 px-2">
          <span>Price</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
        </div>

        {/* Asks (Sells) - reversed to show lowest ask at bottom */}
        <div className="space-y-[2px] mb-2">
          {orderBook.asks
            .slice(0, 10)
            .reverse()
            .map((ask, index) => (
              <div
                key={`ask-${index}`}
                className="grid grid-cols-3 text-xs px-2 py-[2px] relative"
              >
                <div
                  className="absolute inset-0 bg-red-500/20"
                  style={{
                    width: `${(ask.total / maxAskTotal) * 100}%`,
                    right: 0,
                    left: "auto",
                  }}
                />
                <span className="text-red-400 relative z-10">
                  {formatPrice(ask.price)}
                </span>
                <span className="text-right relative z-10">
                  {formatQuantity(ask.quantity)}
                </span>
                <span className="text-right relative z-10">
                  {ask.total.toFixed(2)}
                </span>
              </div>
            ))}
        </div>

        {/* Spread */}
        <div className="flex items-center justify-center py-2 border-y border-[#1f2943] my-2">
          <span className="text-sm font-medium">
            {orderBook.bids[0] && (
              <span className="text-white">
                {formatPrice(
                  (
                    (parseFloat(orderBook.asks[0]?.price || "0") +
                      parseFloat(orderBook.bids[0]?.price || "0")) /
                    2
                  ).toString(),
                )}
              </span>
            )}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            Spread: {spread.value.toFixed(2)} ({spread.percentage.toFixed(3)}%)
          </span>
        </div>

        {/* Bids (Buys) */}
        <div className="space-y-[2px] mt-2">
          {orderBook.bids.slice(0, 10).map((bid, index) => (
            <div
              key={`bid-${index}`}
              className="grid grid-cols-3 text-xs px-2 py-[2px] relative"
            >
              <div
                className="absolute inset-0 bg-green-500/20"
                style={{
                  width: `${(bid.total / maxBidTotal) * 100}%`,
                  right: 0,
                  left: "auto",
                }}
              />
              <span className="text-green-400 relative z-10">
                {formatPrice(bid.price)}
              </span>
              <span className="text-right relative z-10">
                {formatQuantity(bid.quantity)}
              </span>
              <span className="text-right relative z-10">
                {bid.total.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
