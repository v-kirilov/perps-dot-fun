import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/v-kirilov/Blockchain/tree/main/PerpsMarket"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-400 transition-colors"
        >
          <FaGithub />
        </Link>
        <h1 className="text-xl font-bold">Perps.Fun</h1>
      </div>
      <ConnectButton />
    </header>
  );
}
