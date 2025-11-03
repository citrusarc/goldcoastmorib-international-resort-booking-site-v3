import Image from "next/image";
import { cn } from "@/lib/utils";

import { cormorantGaramond } from "@/config/fonts";
import { facilities } from "@/data/facilities";

export default function FacilitiesPage() {
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

        {facilities.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col sm:flex-row p-2 sm:p-4 gap-4 sm:gap-8 shrink-0 border border-neutral-200 rounded-2xl sm:rounded-4xl",
              index % 2 !== 0 && "sm:flex-row-reverse"
            )}
          >
            <div className="relative w-full sm:w-1/2 aspect-4/3 rounded-2xl sm:rounded-4xl overflow-hidden">
              <Image
                fill
                src={item.src[0]}
                alt={item.alt}
                className="object-cover"
              />
            </div>
            <div className="p-2 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold truncate">
                  {item.name}
                </h2>
                <p>{item.description}</p>
              </div>
              <ul className="flex flex-col gap-4 justify-between sm:justify-start text-center sm:text-start">
                {item.details?.map((detail) => {
                  if (!detail?.icon) return null;
                  const Icon = detail.icon;
                  const itemClassName =
                    "flex flex-row gap-4 items-center text-neutral-500";
                  return (
                    <li key={detail.label} className={itemClassName}>
                      <Icon className="w-6 h-6" />
                      {detail.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
