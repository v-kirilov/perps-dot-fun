import Link from "next/link";

export default function FinalCtaSection() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border border-emerald-300/20 bg-emerald-300/[0.06] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
            Ready when your wallet is
          </p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            Open the trading desk and place your first on-chain perp.
          </h2>
        </div>
        <Link
          href="/trade"
          className="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-black text-[#080b0f] transition hover:bg-emerald-100"
        >
          Start trading
        </Link>
      </div>
    </section>
  );
}
