"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries, ColorType } from "lightweight-charts";
import type {
  CandlestickData,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";

// ============================================
// BINANCE API CONFIGURATION
// ============================================

const SYMBOL = "BTCUSDT";
const INTERVAL = "1h";
const LIMIT = 500;

const REST_URL = `https://api.binance.com/api/v3/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=${LIMIT}`;
const WS_URL = `wss://stream.binance.com:9443/ws/${SYMBOL.toLowerCase()}@kline_${INTERVAL}`;

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

async function fetchHistory(): Promise<CandlestickData[]> {
  const response = await fetch(REST_URL);
  const klines: BinanceKline[] = await response.json();

  return klines.map((k) => ({
    time: (k[0] / 1000) as UTCTimestamp,
    open: parseFloat(k[1]),
    high: parseFloat(k[2]),
    low: parseFloat(k[3]),
    close: parseFloat(k[4]),
  }));
}

const INTERVALS = ['15m', '1h', '2h', '4h', '1d', '1w', '1M'] as const;
type IntervalType = typeof INTERVALS[number];

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>('1h');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleIntervalChange = (interval: IntervalType) => {
    setSelectedInterval(interval);
    setIsDropdownOpen(false);
    // TODO: Reconnect WebSocket and fetch new data with new interval
    console.log('Selected interval:', interval);
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // ============================================
    // 1. CREATE THE CHART
    // ============================================

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

    // ============================================
    // 2. ADD CANDLESTICK SERIES
    // ============================================

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candleSeriesRef.current = candleSeries;

    // ============================================
    // 3. WEBSOCKET CONNECTION
    // ============================================

    let reconnectTimeout: NodeJS.Timeout;
    let isDisposed = false;

    function connectWebSocket() {
      if (isDisposed) return;
      
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => console.log("WebSocket connected");

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

    // ============================================
    // 4. INITIALIZE
    // ============================================

    async function init() {
      if (isDisposed) return;
      
      console.log("Fetching historical data...");
      const history = await fetchHistory();
      
      if (isDisposed) return;
      
      candleSeries.setData(history);
      console.log(`Loaded ${history.length} candles`);

      console.log("Connecting to WebSocket...");
      connectWebSocket();
    }

    init().catch(console.error);

    // ============================================
    // 5. CLEANUP ON UNMOUNT
    // ============================================

    return () => {
      isDisposed = true;
      clearTimeout(reconnectTimeout);
      wsRef.current?.close();
      wsRef.current = null;
      candleSeriesRef.current = null;
      chartRef.current = null;
      chart.remove();
    };
  }, []);

//   return (
//       <div
//         ref={chartContainerRef}
//         style={{ width: "100%", height: "500px" }}
//       ></div>
//   );
return (
  <div style={{ position: 'relative', width: '100%', height: '500px' }}>
    <div
      ref={chartContainerRef}
      style={{ width: '100%', height: '100%' }}
    />
    {/* Timeframe Dropdown */}
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 10,
      }}
    >
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
      >
        {selectedInterval}
        <span className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg">
          {INTERVALS.map((interval) => (
            <button
              key={interval}
              onClick={() => handleIntervalChange(interval)}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-700 text-white ${
                selectedInterval === interval ? 'bg-blue-600' : ''
              }`}
            >
              {interval}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
