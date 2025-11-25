"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

import { cormorantGaramond } from "@/config/fonts";
import { activitiesAndEvents } from "@/data/activities-and-events";
import { ActivitiesAndEventsItem } from "@/types";

export default function ActivitiesAndEventsPage() {
  const params = useParams();
  const slug = params?.slug;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageCarousel, setImageCarousel] = useState<string[]>([]);
  const [activityAndEvent, setActivityAndEvent] =
    useState<ActivitiesAndEventsItem | null>(null);

  useEffect(() => {
    if (!slug) return;
    const found = activitiesAndEvents.find((a) => a.id === slug);
    if (found) {
      setActivityAndEvent(found);
      const srcArray = Array.isArray(found.src) ? found.src : [found.src];
      setImageCarousel(srcArray);
      setSelectedImage(srcArray[0]);
    }
  }, [slug]);

  return (
    <section className="flex p-4 sm:p-8 items-center justify-center text-neutral-600">
      <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-6xl">
        <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            fill
            src={
              imageCarousel[0] ??
              "/Images/activities-and-events-details-hero-banner.jpg"
            }
            alt="Gold Coast Morib International Resort Booking Hero Banner"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
            <h1 className="text-lg sm:text-xl">Discover the Fun</h1>
            <p
              className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
            >
              Find New Joys <br />
              Create Memories
            </p>
          </div>
        </div>

        {!activityAndEvent ? (
          <p className="text-center text-neutral-400 py-8">
            No activity and event available.
          </p>
        ) : (
          <div>
            <div className="flex flex-col gap-8 sm:gap-16 shrink-0">
              <div className="space-y-4">
                <div className="relative w-full h-[280px] sm:h-[560px] rounded-2xl sm:rounded-4xl shrink-0 overflow-hidden">
                  {selectedImage ? (
                    <Image
                      fill
                      src={selectedImage}
                      alt={activityAndEvent.alt}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 overflow-x-auto">
                  {imageCarousel.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(item)}
                      className={cn(
                        "relative w-24 sm:w-28 h-24 sm:h-28 shrink-0 cursor-pointer rounded-xl overflow-hidden transition-all border-2",
                        selectedImage === item
                          ? "border-amber-500"
                          : "border-transparent hover:border-amber-200"
                      )}
                    >
                      <Image
                        fill
                        src={item}
                        alt={`${activityAndEvent.alt} ${index + 1}`}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  {activityAndEvent.name}
                </h2>
                <p>{activityAndEvent.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
