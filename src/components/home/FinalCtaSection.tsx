import Link from "next/link";

export default function FinalCtaSection() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden border border-emerald-300/20 bg-emerald-300/[0.06] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-[110px]" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
            Ready when your wallet is
          </p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            Open the trading desk and place your first on-chain perp.
          </h2>
        </div>
        <Link
          href="/trade"
          className="group relative inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-sm font-black text-[#080b0f] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-[0_12px_30px_-10px_rgba(255,255,255,0.5)]"
        >
          Start trading
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
