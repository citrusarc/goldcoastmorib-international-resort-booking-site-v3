import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { activities } from "@/data/activities";

export default function ActivitiesPage() {
  return (
    <section className="flex p-4 sm:p-8 items-center justify-center text-white">
      <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-6xl">
        <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            fill
            src="/Images/activities-hero-banner.jpg"
            alt="Gold Coast Morib International Resort Booking Hero Banner"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
            <h1 className="text-lg sm:text-xl">Adventure Awaits</h1>
            <p
              className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
            >
              Make Every Day Memorable <br />
              Discover Something New
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
                  <div className="absolute flex p-4 sm:p-6 bottom-0 space-x-2 w-full items-center justify-between">
                    <h2 className="px-4 py-2 text-xl font-semibold rounded-full truncate text-amber-500 bg-white/80">
                      {item.name}
                    </h2>
                    <div className="flex w-12 h-12 items-center justify-center shrink-0 rounded-full backdrop-blur-sm text-amber-500 group-hover:text-amber-600 bg-amber-100 group-hover:bg-amber-500/50">
                      <ArrowRight className="w-5 h-5" />
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
