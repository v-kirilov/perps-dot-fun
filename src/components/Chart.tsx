"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries, ColorType } from "lightweight-charts";
import DropDownButton from "./ui/DropDownButton";
import type {
  CandlestickData,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { fetchLastNCandles } from "@/app/lib/binance-service";

// ============================================
// BINANCE API CONFIGURATION
// ============================================

const LIMIT = 500;

const getRestUrl = (interval: string, symbol: string) =>
  `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${LIMIT}`;

const getWsUrl = (interval: string, symbol: string) =>
  `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
// Binance kline format: [openTime, open, high, low, close, volume, closeTime, ...]
type BinanceKline = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  ...unknown[],
];

// Binance WebSocket kline message format
interface BinanceWsMessage {
  e: string;
  k: {
    t: number; // Kline start time (ms)
    o: string; // Open price
    h: string; // High price
    l: string; // Low price
    c: string; // Close price
    x: boolean; // Is this kline closed?
  };
}

const INTERVALS = ["15m", "1h", "2h", "4h", "1d", "1w", "1M"] as const;
type IntervalType = (typeof INTERVALS)[number];

interface ChartProps<T extends string> {
  symbols: readonly T[];
  selectedSymbol: T;
  onSymbolChange: (symbol: T) => void;
}

export default function Chart<T extends string>({
  symbols,
  selectedSymbol,
  onSymbolChange,
}: ChartProps<T>) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [selectedInterval, setSelectedInterval] = useState<IntervalType>("1h");

  // Create chart once on mount
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "#131722" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1f2943" },
        horzLines: { color: "#1f2943" },
      },
      crosshair: {
        mode: 0,
        vertLine: { color: "#758696", labelBackgroundColor: "#4c525e" },
        horzLine: { color: "#758696", labelBackgroundColor: "#4c525e" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 10,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candleSeriesRef.current = candleSeries;

    return () => {
      chartRef.current = null;
      candleSeriesRef.current = null;
      chart.remove();
    };
  }, []);

  // Fetch data and connect WebSocket when interval changes
  useEffect(() => {
    if (!candleSeriesRef.current) return;

    let isDisposed = false;
    let reconnectTimeout: NodeJS.Timeout;

    function connectWebSocket() {
      if (isDisposed) return;

      // Close existing connection
      wsRef.current?.close();

      const ws = new WebSocket(getWsUrl(selectedInterval, selectedSymbol));
      wsRef.current = ws;

      ws.onopen = () =>
        console.log(`WebSocket connected (${selectedInterval})`);

      ws.onmessage = (event) => {
        if (isDisposed) return;

        const msg: BinanceWsMessage = JSON.parse(event.data);
        const k = msg.k;

        candleSeriesRef.current?.update({
          time: (k.t / 1000) as UTCTimestamp,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        });
      };

      ws.onclose = () => {
        if (isDisposed) return;
        console.log("WebSocket closed, reconnecting...");
        reconnectTimeout = setTimeout(connectWebSocket, 1000);
      };

      ws.onerror = (error) => console.error("WebSocket error:", error);
    }

    async function init() {
      if (isDisposed) return;

      console.log(`Fetching historical data for ${selectedInterval}...`);
      
      const history = await fetchLastNCandles(selectedInterval,LIMIT, selectedSymbol);

      if (isDisposed) return;

      candleSeriesRef.current?.setData(history);
      console.log(`Loaded ${history.length} candles`);

      connectWebSocket();
    }

    init().catch(console.error);

    return () => {
      isDisposed = true;
      clearTimeout(reconnectTimeout);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [selectedInterval, selectedSymbol]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          display: "flex",
          gap: "8px",
        }}
      >
        <DropDownButton
          options={symbols}
          selectedOption={selectedSymbol}
          onOptionChange={onSymbolChange}
        />
        <DropDownButton
          options={INTERVALS}
          selectedOption={selectedInterval}
          onOptionChange={setSelectedInterval}
        />
      </div>
    </div>
  );
}
