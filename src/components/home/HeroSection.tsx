import Link from "next/link";

type Stat = {
  label: string;
  value: string;
};

type OrderFlowItem = {
  side: "Long" | "Short";
  size: string;
  price: string;
};

type ProgressMetric = {
  label: string;
  value: string;
  percent: number;
  barClassName: string;
};

const stats: Stat[] = [
  { label: "Max leverage", value: "3x" },
  { label: "Execution", value: "On-chain" },
  { label: "Settlement", value: "Ethereum" },
  { label: "Market mode", value: "Perpetuals" },
];

const orderFlow: OrderFlowItem[] = [
  { side: "Short", size: "7.24", price: "3,493.8" },
  { side: "Short", size: "4.90", price: "3,489.4" },
  { side: "Long", size: "8.12", price: "3,481.2" },
  { side: "Long", size: "5.77", price: "3,476.5" },
];

const progressMetrics: ProgressMetric[] = [
  {
    label: "Collateral",
    value: "68%",
    percent: 68,
    barClassName: "bg-cyan-300",
  },
  {
    label: "Risk used",
    value: "31%",
    percent: 31,
    barClassName: "bg-amber-300",
  },
];

const chartBars = [38, 46, 32, 58, 52, 71, 64, 78, 56, 86, 73, 92, 67, 81];

function ArrowRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

function StatStrip() {
  return (
    <div className="grid grid-cols-[repeat(4,minmax(12rem,1fr))] overflow-x-auto border border-white/10 bg-black/25">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`min-w-48 border-white/10 p-5 ${
            index < stats.length - 1 ? "border-r" : ""
          }`}
        >
          <div className="text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-slate-500 sm:text-[11px] sm:tracking-[0.18em]">
            {stat.label}
          </div>
          <div className="mt-3 text-lg font-bold text-white sm:text-xl">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function PricePath() {
  return (
    <div className="relative flex h-72 items-end gap-2 border-l border-b border-white/10 px-4 pb-4">
      <div className="absolute left-0 top-0 h-px w-full bg-white/10" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />

      {chartBars.map((height, index) => (
        <div
          key={`${height}-${index}`}
          className="flex flex-1 items-end justify-center"
          style={{ height: `${height}%` }}
        >
          <span
            className={`w-full max-w-5 ${
              index > 8 ? "bg-emerald-300" : "bg-slate-600"
            }`}
            style={{ height: `${Math.max(24, height)}%` }}
          />
        </div>
      ))}

      <div className="absolute right-4 top-10 border border-amber-300/40 bg-amber-300/10 px-3 py-2">
        <div className="text-[10px] uppercase tracking-[0.16em] text-amber-100/70">
          Liquidation buffer
        </div>
        <div className="font-mono text-sm text-amber-200">28.6%</div>
      </div>
    </div>
  );
}

function RecentFlow() {
  return (
    <div className="space-y-2">
      {orderFlow.map((order) => (
        <div
          key={`${order.side}-${order.price}`}
          className="grid grid-cols-3 gap-2 border border-white/8 bg-white/[0.03] px-3 py-2 font-mono text-xs"
        >
          <span
            className={
              order.side === "Long" ? "text-emerald-300" : "text-rose-300"
            }
          >
            {order.side}
          </span>
          <span className="text-slate-300">{order.size}</span>
          <span className="text-right text-slate-400">{order.price}</span>
        </div>
      ))}
    </div>
  );
}

function MarginPreview() {
  return (
    <div className="mt-6 border border-white/10 bg-black/20 p-4">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        Margin preview
      </div>
      <div className="mt-4 space-y-3">
        {progressMetrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span>{metric.label}</span>
              <span>{metric.value}</span>
            </div>
            <div className="h-2 bg-white/10">
              <div
                className={`h-full ${metric.barClassName}`}
                style={{ width: `${metric.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketTerminal() {
  return (
    <div className="relative">
      <div className="absolute -left-3 top-8 hidden h-24 w-px bg-amber-300/70 lg:block" />
      <div className="border border-white/12 bg-[#0d1218]/95 shadow-2xl shadow-black/40">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Active instrument
            </div>
            <div className="mt-1 flex items-end gap-3">
              <span className="text-3xl font-black">ETH-PERP</span>
              <span className="pb-1 text-sm font-semibold text-emerald-300">
                +1.84%
              </span>
            </div>
          </div>
          <div className="border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-right">
            <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/70">
              Mark
            </div>
            <div className="font-mono text-lg text-emerald-200">$3,482.10</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_220px]">
          <div className="min-h-[360px] border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-500">
              <span>Price path</span>
              <span>1h candles</span>
            </div>
            <PricePath />
          </div>

          <aside className="p-5">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Recent flow
            </div>
            <RecentFlow />
            <MarginPreview />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative border-b border-white/10">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
        <div className="flex min-h-[620px] flex-col justify-between gap-10">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
              <span className="h-2 w-2 bg-emerald-300" />
              Ethereum perpetual desk
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.93] tracking-normal text-white md:text-7xl xl:text-8xl">
              Perps that feel like a terminal, not a template.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Perps.FUN is a non-custodial perpetual exchange for traders who
              want a clean market surface, fast intent, and on-chain settlement
              without the casino gloss.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/trade"
                className="inline-flex h-12 items-center justify-center gap-2 bg-emerald-300 px-6 text-sm font-bold text-[#07110d] transition hover:bg-emerald-200"
              >
                Open trading desk
                <ArrowRightIcon />
              </Link>
              <a
                href="#market-system"
                className="inline-flex h-12 items-center justify-center border border-white/14 px-6 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/[0.04]"
              >
                See the system
              </a>
            </div>
          </div>

          <StatStrip />
        </div>

        <MarketTerminal />
      </div>
    </section>
  );
}
