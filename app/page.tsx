"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  BirthdayCake,
  Cutlery,
} from "iconoir-react";

import { cormorantGaramond, merriweather } from "@/config/fonts";
import { overview } from "@/data/overview";
import { activities } from "@/data/activities";
import { benefits } from "@/data/benefits";
import { supabase } from "@/utils/supabase/client";
import { mapAccommodationsData } from "@/lib/mapAccommodationsData";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAccommodations, setCurrentAccommodations] = useState(0);
  const [currentActivities, setCurrentActivities] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setCurrentSlide((prev) => (prev + 1) % overview.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentSlide((prev) => (prev === 0 ? overview.length - 1 : prev - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % overview.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newItems = width < 640 ? 1 : width < 1024 ? 1 : 2;
      setItemsToShow(newItems);

      setCurrentAccommodations((prev) =>
        Math.min(prev, Math.max(0, accommodations.length - newItems))
      );
      setCurrentActivities((prev) =>
        Math.min(prev, Math.max(0, activities.length - newItems))
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [accommodations.length, activities.length]);

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
            <h1 className="text-lg sm:text-xl">Welcome To</h1>
            <p className={`text-center ${cormorantGaramond.className}`}>
              <span className="block text-[48px] sm:text-[96px] leading-none">
                Gold Coast Morib
              </span>
              <span className="block text-[32px] sm:text-[48px] leading-none">
                International Resort
              </span>
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h2
            className={`${merriweather.className} text-3xl sm:text-4xl text-amber-500`}
          >
            Seaside Gem on Selangor&apos;s Tranquil Coast
          </h2>
          <p className="flex text-base sm:text-lg text-neutral-600">
            Wake up to the rhythm of the waves, unwind in your private jacuzzi,
            and make a splash with the kids at the onsite water theme park, all
            just steps from your suite.
          </p>
          <div className="flex flex-row w-full mt-8 sm:mt-0 justify-between sm:justify-start gap-4">
            <div
              className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start 
                w-24 h-24 sm:w-fit sm:h-auto 
                sm:px-4 sm:py-3
                gap-2
                rounded-full
                border border-blue-500 bg-blue-50 text-blue-500"
            >
              <Bed className="w-6 h-6" />
              <span className="text-base sm:text-lg">Stay</span>
            </div>
            <div
              className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start 
                w-24 h-24 sm:w-fit sm:h-auto 
                sm:px-4 sm:py-3
                gap-2
                rounded-full
                border border-blue-50 bg-linear-to-r from-blue-800 to-blue-500 text-amber-500"
            >
              <Cutlery className="w-6 h-6" />
              <span className="text-base sm:text-lg">Dine</span>
            </div>
            <div
              className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start 
            w-24 h-24 sm:w-fit sm:h-auto 
            sm:px-4 sm:py-3
            gap-2
            rounded-full
            border border-blue-500 bg-blue-50 text-blue-500"
            >
              <BirthdayCake className="w-6 h-6" />
              <span className="text-base sm:text-lg">Party</span>
            </div>
          </div>
        </div>
        <div
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={() => handleTouchEnd()}
          className="relative w-full rounded-2xl sm:rounded-4xl overflow-hidden"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out select-none"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {overview.map((item, index) => (
              <div
                key={index}
                className="relative w-full h-[180px] sm:h-[360px] shrink-0"
              >
                <Image
                  fill
                  src={item.src}
                  alt={item.alt || `Overview Image ${index + 1}`}
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-solid" />
          </div>
        ) : accommodations.length === 0 ? (
          <p className="text-center text-zinc-500 py-8">
            No accommodations available.
          </p>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between text-neutral-400">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-amber-500">
                  Explore our accommodations
                </h2>
                <p className="text-neutral-600">
                  Find the perfect place to stay
                </p>
              </div>
              <Link
                href="/accommodations"
                className="group flex gap-2 items-center cursor-pointer hover:text-blue-600"
              >
                <span className="hidden sm:inline">See All Accommodations</span>
                <div className="flex sm:hidden w-12 h-12 items-center justify-center shrink-0 rounded-full cursor-pointer backdrop-blur-sm bg-neutral-100 group-hover:bg-blue-500/50">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>

            <div className="relative flex items-center">
              <button
                onClick={() =>
                  setCurrentAccommodations((prev) =>
                    prev <= 0
                      ? accommodations.slice(0, 5).length - itemsToShow
                      : prev - 1
                  )
                }
                className="absolute left-0 z-10 flex w-12 h-12 items-center justify-center shrink-0 rounded-full cursor-pointer backdrop-blur-sm text-amber-500 hover:text-amber-600 bg-amber-100 hover:bg-amber-500/50"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="w-full overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-4"
                  style={{
                    transform: `translateX(calc(-${currentAccommodations} * ((100% - ${
                      (itemsToShow - 1) * 16
                    }px) / ${itemsToShow} + 16px)))`,
                  }}
                >
                  {accommodations.slice(0, 5).map((item, index) => (
                    <Link
                      key={index}
                      href={`/accommodations/${item.id}`}
                      className="flex flex-col sm:flex-row gap-4 p-2 sm:p-4 h-[440px] sm:h-auto shrink-0 rounded-2xl sm:rounded-4xl border border-neutral-200 bg-white"
                      style={{
                        flex: `0 0 calc((100% - ${
                          (itemsToShow - 1) * 16
                        }px) / ${itemsToShow})`,
                      }}
                    >
                      <div className="relative w-full sm:w-40 aspect-4/3 sm:aspect-square rounded-xl sm:rounded-2xl overflow-hidden">
                        <Image
                          fill
                          src={Array.isArray(item.src) ? item.src[0] : item.src}
                          alt={
                            item.alt
                              ? item.alt
                              : `Accommodations Image ${index + 1}`
                          }
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col p-2 justify-between">
                        <div className="space-y-2">
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
                        </div>
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
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  setCurrentAccommodations((prev) =>
                    prev >= accommodations.slice(0, 5).length - itemsToShow
                      ? 0
                      : prev + 1
                  )
                }
                className="absolute right-0 z-10 flex w-12 h-12 items-center justify-center shrink-0 rounded-full cursor-pointer backdrop-blur-sm text-amber-500 hover:text-amber-600 bg-amber-100 hover:bg-amber-500/50"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        <div className="space-y-8">
          <div className="flex items-center justify-between text-neutral-400">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-amber-500">
                Nearby activities
              </h2>
            </div>
            <Link
              href="/activities"
              className="group flex gap-2 items-center cursor-pointer hover:text-blue-600"
            >
              <span className="hidden sm:inline">See What&apos;s Around</span>
              <div className="flex sm:hidden w-12 h-12 items-center justify-center shrink-0 rounded-full cursor-pointer backdrop-blur-sm bg-neutral-100 group-hover:bg-blue-500/50">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <div className="relative flex items-center">
            <button
              onClick={() =>
                setCurrentActivities((prev) =>
                  prev <= 0
                    ? activities.slice(0, 5).length - itemsToShow
                    : prev - 1
                )
              }
              className="absolute left-0 z-10 flex w-12 h-12 items-center justify-center shrink-0 rounded-full cursor-pointer backdrop-blur-sm text-amber-500 hover:text-amber-600 bg-amber-100 hover:bg-amber-500/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{
                  transform: `translateX(calc(-${currentActivities} * ((100% - ${
                    (itemsToShow - 1) * 16
                  }px) / ${itemsToShow} + 16px)))`,
                }}
              >
                {activities.slice(0, 5).map((item, index) => (
                  <Link
                    key={index}
                    href={`/activities/${item.id}`}
                    className="flex flex-col sm:flex-row gap-4 h-[440px] sm:h-[194px] shrink-0 rounded-2xl sm:rounded-4xl overflow-hidden"
                    style={{
                      flex: `0 0 calc((100% - ${
                        (itemsToShow - 1) * 16
                      }px) / ${itemsToShow})`,
                    }}
                  >
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        fill
                        src={Array.isArray(item.src) ? item.src[0] : item.src}
                        alt={
                          item.alt ? item.alt : `Activities Image ${index + 1}`
                        }
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 p-5 sm:p-6 w-full space-y-2">
                        <h2 className="text-xl font-semibold truncate">
                          {item.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                setCurrentActivities((prev) =>
                  prev >= activities.slice(0, 5).length - itemsToShow
                    ? 0
                    : prev + 1
                )
              }
              className="absolute right-0 z-10 flex w-12 h-12 items-center justify-center shrink-0 rounded-full cursor-pointer backdrop-blur-sm text-amber-500 hover:text-amber-600 bg-amber-100 hover:bg-amber-500/50"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 text-center">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="relative w-48 h-48">
                <Image
                  fill
                  src={item.src}
                  alt={item.alt || `Benefit Image ${index + 1}`}
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-600">
                {item.name}
              </h2>
              <p className="text-neutral-600 max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
