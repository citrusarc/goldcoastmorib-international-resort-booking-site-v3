"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { cormorantGaramond } from "@/config/fonts";
import { slides } from "@/data/slideBanner";
import { accomodations } from "@/data/accomodation";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAccomodations, setCurrentAccomodations] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      const accomodationsNewItem = width < 640 ? 1 : width < 1024 ? 1 : 2;
      setItemsToShow(accomodationsNewItem);
      setCurrentAccomodations((prev) =>
        Math.min(prev, accomodations.length - accomodationsNewItem)
      );
    };
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, [accomodations.length]);

  return (
    <section className="flex p-4 sm:p-8 items-center justify-center text-neutral-600">
      <div className="flex flex-col gap-8 w-full max-w-6xl">
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

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-amber-500">
                Explore our accomodations
              </h2>
              <p className="text-neutral-400">Descriptions here</p>
            </div>
            <p>View More</p>
          </div>

          <div className="relative flex items-center">
            <button
              onClick={() =>
                setCurrentAccomodations((prev) =>
                  prev <= 0 ? accomodations.length - itemsToShow : prev - 1
                )
              }
              className="absolute left-0 z-10 flex w-10 h-10 items-center justify-center rounded-full cursor-pointer backdrop-blur-sm text-amber-600 hover:text-white bg-amber-500/30 hover:bg-amber-500/50"
            >
              &#8592;
            </button>

            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{
                  transform: `translateX(calc(-${currentAccomodations} * ((100% - ${
                    (itemsToShow - 1) * 16
                  }px) / ${itemsToShow} + 16px)))`,
                }}
              >
                {accomodations.map((item, index) => {
                  const getLabelColor = (label?: string) => {
                    switch (label?.toLowerCase()) {
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
                    <div
                      key={index}
                      className="flex gap-4 p-2 sm:p-4 shrink-0 rounded-2xl sm:rounded-4xl border border-neutral-200 bg-white"
                      style={{
                        flex: `0 0 calc((100% - ${
                          (itemsToShow - 1) * 16
                        }px) / ${itemsToShow})`,
                      }}
                    >
                      <div className="relative w-36 aspect-square rounded-2xl sm:rounded-4xl overflow-hidden">
                        <Image
                          fill
                          src={item.src}
                          alt={item.alt ? item.alt : `Hero Banner ${index + 1}`}
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p
                          className={`px-2 py-1 w-fit rounded-full ${getLabelColor(
                            item.label
                          )}`}
                        >
                          {item.label}
                        </p>
                        <p className="text-xl font-semibold text-blue-600">
                          <span className="text-base font-normal text-neutral-400">
                            from <br />
                          </span>
                          {item.price.currency}
                          {item.price.current}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() =>
                setCurrentAccomodations((prev) =>
                  prev >= accomodations.length - itemsToShow ? 0 : prev + 1
                )
              }
              className="absolute right-0 z-10 flex w-10 h-10 items-center justify-center rounded-full cursor-pointer backdrop-blur-sm text-amber-600 hover:text-white bg-amber-500/30 hover:bg-amber-500/50"
            >
              &#8594;
            </button>
          </div>
        </div>
        <div className="relative w-full rounded-2xl sm:rounded-4xl overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out select-none"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((item, index) => (
              <div
                key={index}
                className="relative w-full h-[180px] sm:h-[360px] shrink-0"
              >
                <Image
                  fill
                  src={item.src}
                  alt={item.alt || `Hero Banner ${index + 1}`}
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
