"use client";
import { closeTrade, Trade } from "@/app/lib/data-service";
import Button from "./ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";

interface TradeRowProps {
  trade: Trade;
  onTradeUpdate?: () => void; // Callback to trigger parent rerender
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function TradeRow({ trade, onTradeUpdate }: TradeRowProps) {
  const isProfit = trade.profit >= 0;
  const [isClosing, setIsClosing] = useState(false);

  async function handleCloseTrade() {
    trade.isOpen = false; // Optimistically update UI
    if (!trade.id) return;
    setIsClosing(true);
    try {
      await closeTrade(trade.id!.toString(), new Date());
      // Trigger parent component to refetch data
      if (onTradeUpdate) {
        onTradeUpdate();
      }
    } catch (error) {
      console.error("Error closing trade:", error);
      toast.error("Failed to close trade", { position: "top-center" });
    } finally {
      setIsClosing(false);
    }
  }

  return (
    <tr className="border-b border-[#1f2943] hover:bg-[#1a1f2e] transition-colors">
      <td className="px-4 py-3 text-sm font-mono text-gray-400">{trade.id}</td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {formatDate(trade.created_at)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {trade.closed_at ? formatDate(trade.closed_at) : "-"}
      </td>
      <td className="px-4 py-3 text-sm text-right font-medium text-white">
        {formatAmount(trade.amount)}
      </td>
      <td
        className={`px-4 py-3 text-sm text-right font-medium ${
          isProfit ? "text-green-400" : "text-red-400"
        }`}
      >
        {formatAmount(trade.profit)}
      </td>
      <td className="px-4 py-3 text-sm text-center">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            trade.isOpen
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {trade.isOpen ? "Open" : "Closed"}
        </span>
      </td>
      <td className="px-2 text-sm text-center font-medium text-white">
        {trade.eth_amount.toPrecision(4)} ETH
      </td>

      <td className="px-2 text-sm text-center font-medium text-white">
        ${trade.entry_price}
      </td>

      <td className="px-4 py-3 text-sm text-center">
        <Button
          type="small"
          onClick={handleCloseTrade}
          disabled={!trade.isOpen || isClosing}
        >
          {isClosing ? "Closing..." : trade.isOpen ? "Close" : "Closed"}
        </Button>
      </td>
    </tr>
  );
}
