"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  BedIcon,
  BeachBallIcon,
  CalendarDotsIcon,
  ForkKnifeIcon,
  LockersIcon,
} from "@phosphor-icons/react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 flex p-4 sm:p-8  items-center justify-center">
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
          <Link
            href="/accomodations"
            className={clsx(
              "group flex items-center gap-2 rounded-full transition-all duration-200",
              pathname === "/accomodations"
                ? "text-amber-500"
                : "hover:text-amber-500"
            )}
          >
            <BedIcon size={24} weight="fill" />
            <span className="hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              Accomodations
            </span>
          </Link>
          <Link
            href="/restaurant"
            className={clsx(
              "group flex items-center gap-2 rounded-full transition-all duration-200",
              pathname === "/restaurant"
                ? "text-amber-500"
                : "hover:text-amber-500"
            )}
          >
            <ForkKnifeIcon size={24} weight="fill" />
            <span className="hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              Restaurant
            </span>
          </Link>
          <Link
            href="/facilities"
            className={clsx(
              "group flex items-center gap-2 rounded-full transition-all duration-200",
              pathname === "/facilities"
                ? "text-amber-500"
                : "hover:text-amber-500"
            )}
          >
            <LockersIcon size={24} weight="fill" />
            <span className="hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              Facilities
            </span>
          </Link>
          <Link
            href="/activities"
            className={clsx(
              "group flex items-center gap-2 rounded-full transition-all duration-200",
              pathname === "/activities"
                ? "text-amber-500"
                : "hover:text-amber-500"
            )}
          >
            <BeachBallIcon size={24} weight="fill" />
            <span className="hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              Activities
            </span>
          </Link>
          <Link
            href="/meetings-and-events"
            className={clsx(
              "group flex items-center gap-2 rounded-full transition-all duration-200",
              pathname === "/meetings-and-events"
                ? "text-amber-500"
                : "hover:text-amber-500"
            )}
          >
            <CalendarDotsIcon size={24} weight="fill" />
            <span className="hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              Events
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
