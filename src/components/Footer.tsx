export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          <span className="font-bold text-white">Perps.FUN</span>
        </div>
        <p className="text-sm text-gray-500">
          © 2026 Perps.FUN. Decentralized Perpetual Trading.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
