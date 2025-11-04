import Image from "next/image";
import { Clock, Calendar, CalendarPlus, Pin } from "iconoir-react";

import { cormorantGaramond, merriweather } from "@/config/fonts";
import { events } from "@/data/events";

export default function EventsPage() {
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

  const getGoogleCalendarLink = (event: (typeof events)[number]) => {
    let startDate: Date;
    let endDate: Date;

    if (event.date && event.startTime && event.endTime) {
      startDate = new Date(`${event.date}T${event.startTime}:00`);
      endDate = new Date(`${event.date}T${event.endTime}:00`);
    } else {
      const now = new Date();
      startDate = now;
      endDate = new Date(now.getTime() + 60 * 60 * 1000);
    }

    const start = formatDateForCalendar(startDate);
    const end = formatDateForCalendar(endDate);
    const title = encodeURIComponent(event.name);
    const details = encodeURIComponent(event.description || "");
    const location = encodeURIComponent(event.location || "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <p className="text-start text-neutral-400 py-8">
              No events available.
            </p>
          ) : (
            events.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-2 sm:p-4 shrink-0 rounded-2xl sm:rounded-4xl border border-neutral-200 bg-white"
              >
                <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    fill
                    src={Array.isArray(item.src) ? item.src[0] : item.src}
                    alt={item.alt}
                    className="object-cover"
                  />
                </div>
                <div className="p-2 space-y-6">
                  <div className="relative space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-semibold truncate">
                      {item.name}
                    </h2>
                    {(item.date || item.startTime || item.location) && (
                      <div className="flex flex-col gap-4 justify-between sm:justify-start text-center sm:text-start text-neutral-500">
                        {item.date && (
                          <div className="flex flex-row gap-4 items-center">
                            <Calendar className="w-6 h-6" />
                            <p>
                              {new Date(item.date).toLocaleDateString("en-MY", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        )}
                        {item.startTime && item.endTime && (
                          <div className="flex flex-row gap-4 items-center">
                            <Clock className="w-6 h-6" />
                            <p>
                              {item.startTime} – {item.endTime}
                            </p>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex flex-row gap-4 items-center">
                            <Pin className="w-6 h-6" />
                            <p>{item.location}</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="absolute flex bottom-0 right-0">
                      <a
                        href={getGoogleCalendarLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-12 h-12 items-center justify-center shrink-0 rounded-full backdrop-blur-sm text-amber-500 hover:text-amber-600 bg-amber-100 hover:bg-amber-500/50"
                      >
                        <CalendarPlus className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
