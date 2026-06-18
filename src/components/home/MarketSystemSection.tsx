import Link from "next/link";

type Capability = {
  title: string;
  eyebrow: string;
  description: string;
};

const capabilities: Capability[] = [
  {
    title: "Trade from custody",
    eyebrow: "Wallet native",
    description:
      "Open and manage positions without handing assets to a centralized venue.",
  },
  {
    title: "Built around risk",
    eyebrow: "Position control",
    description:
      "Margin, liquidation distance, and exposure are treated as first-class trading signals.",
  },
  {
    title: "Live market surface",
    eyebrow: "Always moving",
    description:
      "A focused terminal for ETH perpetuals with room to expand into deeper market coverage.",
  },
];

export default function MarketSystemSection() {
  return (
    <section id="market-system" className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              Market system
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-white md:text-5xl">
              A homepage that behaves like the product it opens.
            </h2>
          </div>
          <Link
            href="/trade"
            className="inline-flex h-11 items-center justify-center border border-white/14 px-5 text-sm font-semibold text-slate-200 transition hover:border-emerald-300/60 hover:text-emerald-200"
          >
            Launch app
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <article
              key={capability.title}
              className="border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/24 hover:bg-white/[0.055]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  {capability.eyebrow}
                </span>
                <span className="font-mono text-sm text-slate-600">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {capability.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-400">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
