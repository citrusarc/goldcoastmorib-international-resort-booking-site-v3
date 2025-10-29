"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 flex p-4 sm:p-8 items-center justify-center">
      <div className="flex p-4 items-center justify-between w-full max-w-4xl rounded-full border text-neutral-400 border-black/5 backdrop-blur-sm transition-all duration-200">
        <Link href="/">
          <Image
            src="/Images/brand-logo.png"
            alt="Gold Coast Morib International Resort Logo"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
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
