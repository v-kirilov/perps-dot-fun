"use client";
import {
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { useAccount } from "wagmi";

interface NavLink {
  name: string;
  href: string;
  icon: ReactNode;
  requiresAuth?: boolean;
}

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon className="h-5 w-5" />,
    requiresAuth: false,
  },
    {
    name: "Trade",
    href: "/trade",
    icon: <ChartBarIcon className="h-5 w-5" />,
    requiresAuth: false,
  },
  {
    name: "Trade History",
    href: "/trade-history",
    icon: <CalendarDaysIcon className="h-5 w-5" />,
    requiresAuth: true,
  },
  {
    name: "Profile",
    href: "/account",
    icon: <UserIcon className="h-5 w-5" />,
    requiresAuth: true,
  },
];

function SideNavigation(): ReactNode {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  // Only check connection status after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-r border-primary-900 ">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => {
          // Before mount, assume disconnected (matches server render)
          const isDisabled = link.requiresAuth && (!mounted || !isConnected);
          
          return (
            <li key={link.name}>
              {!isDisabled ? (
                <Link
                  className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold ${
                    pathname === link.href
                      ? "bg-purple-500/20 text-white border-l-4 border-purple-500"
                      : "text-primary-200"
                  }`}
                  href={link.href}
                >
                  <span className={pathname === link.href ? "text-white" : ""}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              ) : (
                <div></div>
                // <button
                //   disabled
                //   className="py-3 px-5 flex items-center gap-4 font-semibold text-primary-200 cursor-not-allowed opacity-50"
                // >
                //   {link.icon}
                //   <span>{link.name}</span>
                // </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideNavigation;
