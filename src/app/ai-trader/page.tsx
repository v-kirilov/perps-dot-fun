"use client";

import AccountGuard from "@/components/AccountGuard";
import AITrader from "@/components/AITrader";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#131722] to-[#0a0e1a]">
      {/* Hero Section */}
      <div className="px-10 pt-8 pb-2">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">AI-Powered Trading Analysis</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            AI Trading Advisor
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Leverage advanced artificial intelligence to analyze market trends, identify opportunities, 
            and make data-driven trading decisions with confidence.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
              📊 Real-time Analysis
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
              🤖 Multiple AI Models
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
              ⚡ Instant Insights
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
              📈 Market Predictions
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-10 py-1">
        <AccountGuard>
          <AITrader />
        </AccountGuard>
      </div>

      {/* Info Section */}
      <div className="px-10 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Deep Analysis</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our AI examines historical price data, volume patterns, and market indicators to provide comprehensive trading insights.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Customizable Settings</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Choose your preferred AI model, timeframe, and historical data range to tailor the analysis to your trading style.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Actionable Insights</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Receive clear, actionable recommendations backed by AI analysis to help guide your trading decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
