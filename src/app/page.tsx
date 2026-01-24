import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e17] via-[#111827] to-[#0a0e17]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-60 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
          {/* Logo & Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur opacity-30" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Perps
              </span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                .FUN
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8">
              Decentralized Perpetual Exchange on Ethereum Mainnet
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/trade"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-white text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Start Trading</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 border border-gray-700 rounded-xl font-semibold text-gray-300 text-lg hover:bg-white/5 hover:border-gray-600 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Max Leverage", value: "3x", icon: "⚡" },
              { label: "Network", value: "ETH", icon: "💎" },
              { label: "Trading Fee", value: "0.1%", icon: "💰" },
              { label: "Fully On-Chain", value: "100%", icon: "🔗" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Why Trade on{" "}
            <span className="text-green-400">Perps.FUN</span>?
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Experience the future of decentralized perpetual trading with our innovative platform
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Non-Custodial",
                description:
                  "Your funds, your keys. Trade directly from your wallet with full control over your assets at all times.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Up to 3x Margin",
                description:
                  "Amplify your positions with up to 3x leverage on perpetual contracts. Maximize gains while managing risk.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                ),
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Ethereum Mainnet",
                description:
                  "Built on Ethereum for maximum security and decentralization. Fully audited smart contracts.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Markets Preview */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-green-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Live Markets
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Trade the most popular perpetual pairs with deep liquidity
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { pair: "BTC/USDT", change: "+2.45%", positive: true },
              { pair: "ETH/USDT", change: "+1.82%", positive: true },
              { pair: "BNB/USDT", change: "-0.65%", positive: false },
            ].map((market) => (
              <div
                key={market.pair}
                className="bg-[#131722] border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-white">
                    {market.pair}
                  </span>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      market.positive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {market.change}
                  </span>
                </div>
                <div className="h-16 bg-gradient-to-r from-white/5 to-transparent rounded-lg flex items-end px-2 pb-2">
                  {/* Mini chart visualization */}
                  <div className="flex items-end gap-1 w-full h-full">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 70, 90].map(
                      (height, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-all duration-300 ${
                            market.positive ? "bg-green-500/60" : "bg-red-500/60"
                          } group-hover:${
                            market.positive ? "bg-green-400" : "bg-red-400"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/trade"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              View All Markets
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20 rounded-3xl p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect your wallet and start trading perpetuals with up to 3x
              leverage on Ethereum Mainnet.
            </p>
            <Link
              href="/trade"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-white text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105"
            >
              Launch App
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}