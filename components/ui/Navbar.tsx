"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { merriweather } from "@/config/fonts";

export default function Navbar() {
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex p-4 sm:p-8 items-center justify-center">
      <div
        className={clsx(
          "flex p-4 items-center justify-between w-full max-w-6xl rounded-full backdrop-blur-sm transition-all duration-200 shadow-xl border border-white/30 bg-white/10",
          scroll ? "text-amber-400" : "text-white"
        )}
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/Images/brand-logo.png"
            alt="Gold Coast Morib International Resort Logo"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <span
            className={`hidden sm:inline-flex ${merriweather.className} text-white`}
          >
            Gold Coast Morib <br />
            International Resort
          </span>
        </Link>
        <div className="flex gap-6 sm:gap-8">
          {siteConfig.navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href || "#"}
                className={clsx(
                  "group flex items-center gap-2 rounded-full transition-all duration-200",
                  isActive ? "text-amber-500" : "hover:text-amber-500"
                )}
              >
                {Icon && <Icon size={24} weight="fill" />}
                <span className="hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
