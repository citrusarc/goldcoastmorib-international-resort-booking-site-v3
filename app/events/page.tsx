"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { cormorantGaramond, merriweather } from "@/config/fonts";
import { events } from "@/data/events";

export default function MeetingsAndEventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
            {events.map((item, index) => (
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
      </div>
    </section>
  );
}
