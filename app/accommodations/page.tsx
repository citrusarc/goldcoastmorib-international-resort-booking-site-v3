"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { supabase } from "@/utils/supabase/client";
import { mapAccommodationsData } from "@/lib/mapAccommodationsData";

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const { data, error } = await supabase
          .from("accommodations")
          .select("*")
          .eq("status->>isHidden", "false");

        if (error) throw error;
        setAccommodations(data.map(mapAccommodationsData));
      } catch (err) {
        console.error("Error loading accommodations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  const tagColor = (tag?: string) => {
    switch (tag?.toLowerCase()) {
      case "recommended":
        return "text-green-600 bg-green-500/20";
      case "good":
        return "text-amber-600 bg-amber-500/20";
      case "not recommended":
        return "text-red-600 bg-red-500/20";
      default:
        return "text-neutral-600 bg-neutral-200";
    }
  };

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
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-solid" />
          </div>
        ) : accommodations.length === 0 ? (
          <p className="text-center text-neutral-400 py-8">
            No accommodations available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodations.map((item, index) => (
              <Link
                key={index}
                href={`/accommodations/${item.id}`}
                className="group flex flex-col gap-4 p-2 sm:p-4 h-[440px] shrink-0 rounded-2xl sm:rounded-4xl cursor-pointer border border-neutral-200 bg-white"
              >
                <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    fill
                    src={Array.isArray(item.src) ? item.src[0] : item.src}
                    alt={
                      item.alt ? item.alt : `Accommodations Image ${index + 1}`
                    }
                    className="object-cover"
                  />
                </div>
                <div className="p-2 space-y-2">
                  <h2 className="text-2xl font-semibold truncate">
                    {item.name}
                  </h2>
                  <p
                    className={`px-2 py-1 w-fit rounded-full ${tagColor(
                      item.tag
                    )}`}
                  >
                    {item.tag}
                  </p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-blue-600">
                      <span className="text-base font-normal text-neutral-400">
                        from <br />
                      </span>
                      {item.price.currency}
                      {item.price.current}
                      <span className="text-xl font-normal text-neutral-400">
                        /night
                      </span>
                    </p>
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
