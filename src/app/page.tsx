import Watchlist from "@/components/Watchlist";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import HeroSection from "@/components/home/HeroSection";
import MarketSystemSection from "@/components/home/MarketSystemSection";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b0f] text-white">
      <HeroSection />
      <MarketSystemSection />
      <Watchlist />
      <FinalCtaSection />
    </main>
  );
}
