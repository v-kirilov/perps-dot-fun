"use client";
import { Trade } from "@/app/lib/data-service";
import Button from "./ui/Button";

interface TradeRowProps {
  trade: Trade;
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

export default function TradeRow({ trade }: TradeRowProps) {
  const isProfit = trade.profit >= 0;

  return (
    <tr className="border-b border-[#1f2943] hover:bg-[#1a1f2e] transition-colors">
      <td className="px-4 py-3 text-sm font-mono text-gray-400">
        {trade.id}
      </td>
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
          <td className="px-4 py-3 text-sm text-center">
       <Button type="small" onClick={() => {}} disabled={!trade.isOpen}>
        {trade.isOpen ? "Close" : "Closed"}
       </Button>
      </td>
    </tr>
  );
}
