import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { activitiesAndEvents } from "@/data/activities-and-events";

export default function ActivitiesAndEventsPage() {
  const formatDateForCalendar = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
      date.getUTCFullYear().toString() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      "T" +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      "Z"
    );
  };

  const getGoogleCalendarLink = (
    activityAndEvent: (typeof activitiesAndEvents)[number]
  ) => {
    let startDate: Date;
    let endDate: Date;

    if (
      activityAndEvent.date &&
      activityAndEvent.startTime &&
      activityAndEvent.endTime
    ) {
      startDate = new Date(
        `${activityAndEvent.date}T${activityAndEvent.startTime}:00`
      );
      endDate = new Date(
        `${activityAndEvent.date}T${activityAndEvent.endTime}:00`
      );
    } else {
      const now = new Date();
      startDate = now;
      endDate = new Date(now.getTime() + 60 * 60 * 1000);
    }

    const start = formatDateForCalendar(startDate);
    const end = formatDateForCalendar(endDate);
    const title = encodeURIComponent(activityAndEvent.name);
    const details = encodeURIComponent(activityAndEvent.description || "");
    const location = encodeURIComponent(activityAndEvent.location || "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  return (
    <section className="flex p-4 sm:p-8 items-center justify-center text-neutral-600">
      <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-6xl">
        <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            fill
            src="/Images/activities-and-events-hero-banner.jpg"
            alt="Gold Coast Morib International Resort Booking Hero Banner"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
            <h1 className="text-lg sm:text-xl">Happenings You’ll Love</h1>
            <p
              className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
            >
              Celebrate, Connect <br />
              Enjoy Every Occasion
            </p>
          </div>
        </div>

        {activitiesAndEvents.length === 0 ? (
          <p className="text-center text-neutral-400 py-8">
            No activities and events available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activitiesAndEvents.map((item, index) => (
              <Link
                key={index}
                href={`/activities-and-events/${item.id}`}
                className="group flex flex-col gap-4 h-[440px] shrink-0 rounded-2xl sm:rounded-4xl cursor-pointer border border-neutral-200 bg-white"
              >
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    fill
                    src={Array.isArray(item.src) ? item.src[0] : item.src}
                    alt={
                      item.alt
                        ? item.alt
                        : `Activities And Events Image ${index + 1}`
                    }
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
