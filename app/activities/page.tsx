import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { activities } from "@/data/activities";

export default function ActivitiesPage() {
  return (
    <section className="flex p-4 sm:p-8 items-center justify-center text-neutral-600">
      <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-6xl">
        <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            fill
            src="/Images/hero-banner-1.png"
            alt="Gold Coast Morib International Resort Booking Hero Banner"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
            <h1 className="text-lg sm:text-xl">Your Getaway Starts Here</h1>
            <p
              className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
            >
              Your Perfect Dates <br />
              Unforgettable Funs
            </p>
          </div>
        </div>
        {activities.length === 0 ? (
          <p className="text-center text-neutral-400 py-8">
            No activities available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((item, index) => (
              <Link
                key={index}
                href={`/activities/${item.id}`}
                className="group flex flex-col gap-4 h-[440px] shrink-0 rounded-2xl sm:rounded-4xl cursor-pointer border border-neutral-200 bg-white"
              >
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    fill
                    src={Array.isArray(item.src) ? item.src[0] : item.src}
                    alt={item.alt ? item.alt : `Activities Image ${index + 1}`}
                    className="object-cover"
                  />
                  <div className="absolute flex bottom-0 p-4 sm:p-6 space-x-2 w-full items-center justify-between">
                    <h2 className="text-xl font-semibold truncate">
                      {item.name}
                    </h2>
                    <div className="flex w-10 h-10 items-center justify-center shrink-0 rounded-full backdrop-blur-sm group-hover:text-blue-600 bg-neutral-100 group-hover:bg-blue-500/50">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
