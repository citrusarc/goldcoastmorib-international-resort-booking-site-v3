"use client";

import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactCountryFlag from "react-country-flag";
import { useState, useEffect } from "react";
import { Plus, Minus } from "iconoir-react";
import { cn } from "@/lib/utils";

import { cormorantGaramond } from "@/config/fonts";
import { RoomsItem } from "@/types";
import { mapRoomsData } from "@/lib/mapRoomsData";
import { SuccessModal, ErrorModal } from "@/components/ui/Modal";

const earlyCheckInSlots = Array.from({ length: 13 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const min = i % 2 === 0 ? "00" : "30";
  return `${hour}:${min}`;
});

type EarlyCheckInSlot = (typeof earlyCheckInSlots)[number];

const today = new Date();
today.setHours(0, 0, 0, 0);

const formSchema = z
  .object({
    checkIn: z.date(),
    checkOut: z.date(),
    adults: z.number().min(1, "At least 1 adult required"),
    children: z.number().min(0, "Cannot be negative"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    countryCode: z.string().min(1, "Select country code"),
    phone: z.string().min(6, "Enter valid phone number"),
    earlyCheckIn: z
      .enum(earlyCheckInSlots as [EarlyCheckInSlot, ...EarlyCheckInSlot[]])
      .nullable(),
    remarks: z.string().min(10, "Describe your request").max(300).optional(),
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.checkIn < today) {
      ctx.addIssue({
        code: "custom",
        message: "Check-in cannot be in the past",
        path: ["checkIn"],
      });
    }
    if (data.checkOut <= data.checkIn) {
      ctx.addIssue({
        code: "custom",
        message: "Check-out must be after check-in",
        path: ["checkOut"],
      });
    }
  });

function Stepper({
  value,
  onChange,
  min = 0,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const isMax = max !== undefined && value >= max;
  const isMin = value <= min;
  return (
    <div className="flex w-full items-center overflow-hidden">
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "w-12 h-12 p-0 rounded-full border border-neutral-200",
          isMin && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={isMin}
      >
        <Minus className="w-5 h-5" />
      </Button>
      <div className="flex-1 text-center select-none">{value}</div>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "w-12 h-12 p-0 rounded-full border border-neutral-200",
          isMax && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => onChange(value + 1)}
        disabled={isMax}
      >
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default function RoomsDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageCarousel, setImageCarousel] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [room, setRoom] = useState<RoomsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: today,
      checkOut: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      adults: 1,
      children: 0,
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+60",
      phone: "",
      earlyCheckIn: null,
      remarks: undefined,
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!room) return;

    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const payload = {
        roomsId: room.id,
        room: {
          name: room.name,
          id: room.id,
        },
        status: "confirmed",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: `${values.countryCode}${values.phone}`,
        checkIn: values.checkIn.toLocaleDateString("en-CA"),
        checkOut: values.checkOut.toLocaleDateString("en-CA"),
        adults: values.adults,
        children: values.children,
        earlyCheckIn: values.earlyCheckIn || null,
        remarks: values.remarks?.trim() || null,
        price: room.price.current,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }

      window.location.href = data.checkout_url;

      // setSuccessMessage("Your booking has been submitted successfully!");
      // form.reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error submitting booking";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        const mappedData = mapRoomsData(data);
        setRoom(mappedData);
      } catch (err) {
        console.error("Error fetching room:", err);
        setErrorMessage("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchRoom();
  }, [slug]);

  useEffect(() => {
    if (!room?.id) return;

    const fetchUnavailableDates = async () => {
      const { checkIn, checkOut } = form.getValues();

      try {
        const res = await fetch(
          `/api/rooms/availability?id=${
            room.id
          }&checkin=${checkIn.toISOString()}&checkout=${checkOut.toISOString()}`
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch availability: ${errorText}`);
        }

        const bookedDates: string[] = await res.json();

        const dates: Date[] = bookedDates.map((d) => {
          const date = new Date(d);
          date.setHours(0, 0, 0, 0);
          return date;
        });

        setUnavailableDates(dates);
      } catch (err) {
        console.error("Error fetching unavailable dates:", err);
        // Optional: show user-friendly message
      }
    };

    fetchUnavailableDates();
  }, [room?.id, form]);

  useEffect(() => {
    if (!room?.src) return;

    const src = Array.isArray(room.src) ? room.src[0] : room.src;

    const parts = src.split("/");
    const file = parts.pop()!;
    const [base, ext] = file.split(".");

    const baseWithoutIndex = base.replace(/-\d+$/, "");

    const allImages = Array.from({ length: 5 }, (_, i) => {
      return `${parts.join("/")}/${baseWithoutIndex}-${i + 1}.${ext}`;
    });

    setSelectedImage(allImages[0]);
    setImageCarousel(allImages);
  }, [room?.src]);

  useEffect(() => {
    if (status === "success") {
      setSuccessMessage("Payment successful! Your booking is confirmed.");
    } else if (status === "failed") {
      setErrorMessage("Payment failed. Please try again.");
    }
  }, [status]);

  return (
    <section className="flex p-4 sm:p-8 items-center justify-center text-neutral-600">
      <div className="flex flex-col gap-8 sm:gap-16 w-full max-w-6xl">
        <div className="relative w-screen h-96 sm:h-[560px] -mt-36 sm:-mt-48 rounded-b-[32px] sm:rounded-b-[64px] left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            fill
            src="/Images/room-details-hero-banner.jpg"
            alt="Gold Coast Morib International Resort Booking Hero Banner"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex flex-col gap-4 pb-24 items-center justify-end text-white">
            <h1 className="text-lg sm:text-xl">Book Your Stay</h1>
            <p
              className={`block leading-none text-[40px] sm:text-[72px] text-center ${cormorantGaramond.className}`}
            >
              Reserve Your Stay <br />
              Let The Fun Begin
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-solid" />
          </div>
        ) : !room ? (
          <p className="text-center text-neutral-400 py-8">
            No rooms available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16">
            <div className="flex flex-col gap-8 sm:gap-16 shrink-0">
              <div className="space-y-4">
                <div className="relative w-full aspect-4/3 rounded-2xl sm:rounded-4xl overflow-hidden">
                  {selectedImage ? (
                    <Image
                      fill
                      src={selectedImage}
                      alt={room.alt}
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
                        "relative w-24 h-24 shrink-0 cursor-pointer rounded-xl overflow-hidden transition-all border-2",
                        selectedImage === item
                          ? "border-amber-500"
                          : "border-transparent hover:border-amber-200"
                      )}
                    >
                      <Image
                        fill
                        src={item}
                        alt={`${room.alt} ${index + 1}`}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold">
                    {room.name}
                  </h2>
                  <p
                    className={`px-2 py-1 w-fit rounded-full ${tagColor(
                      room.tag
                    )}`}
                  >
                    {room.tag}
                  </p>
                </div>
                <p>{room.description}</p>
                <ul className="flex flex-col gap-4 justify-between sm:justify-start text-center sm:text-start">
                  {room.facilities?.map((item) => {
                    if (!item?.icon) return null;
                    const Icon = item.icon;
                    const itemClassName =
                      "flex flex-row gap-4 items-center text-neutral-500";
                    return (
                      <li key={item.label} className={itemClassName}>
                        <Icon className="w-6 h-6" />
                        {item.label}
                      </li>
                    );
                  })}
                </ul>
                <p className="text-2xl sm:text-3xl font-semibold text-blue-600 ">
                  {room.price.currency}
                  {room.price.current}
                  <span className="text-xl sm:text-2xl font-normal text-neutral-400">
                    /night
                  </span>
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col w-full">
              <div className="relative p-6 sm:p-8 w-full rounded-2xl sm:rounded-4xl overflow-hidden shadow-md border border-neutral-200 text-neutral-600 bg-white">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 sm:space-y-8"
                  >
                    {/* Dates */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full">
                      <FormField
                        control={form.control}
                        name="checkIn"
                        render={() => (
                          <FormItem className="flex-1">
                            <FormLabel
                              className={`${
                                errors.checkIn || errors.checkOut
                                  ? "text-red-600"
                                  : "text-neutral-400"
                              }`}
                            >
                              Stay Duration
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full h-12 items-center justify-start text-left rounded-xl sm:rounded-2xl",
                                      !form.watch("checkIn") ||
                                        !form.watch("checkOut")
                                        ? "text-neutral-400"
                                        : "text-neutral-600"
                                    )}
                                  >
                                    {form.watch("checkIn") &&
                                    form.watch("checkOut") ? (
                                      <>
                                        {form
                                          .watch("checkIn")
                                          .toLocaleDateString("en-GB")}
                                        —{" "}
                                        {form
                                          .watch("checkOut")
                                          .toLocaleDateString("en-GB")}
                                      </>
                                    ) : (
                                      <span>Select dates</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                align="start"
                                className="p-2 w-(--radix-popover-trigger-width) rounded-xl sm:rounded-2xl"
                              >
                                <Calendar
                                  mode="range"
                                  selected={{
                                    from: form.watch("checkIn"),
                                    to: form.watch("checkOut"),
                                  }}
                                  defaultMonth={form.watch("checkIn")}
                                  onSelect={(range) => {
                                    if (range?.from && range?.to) {
                                      form.setValue("checkIn", range.from);
                                      form.setValue("checkOut", range.to);
                                    } else if (range?.from) {
                                      form.setValue("checkIn", range.from);
                                      form.setValue("checkOut", range.from);
                                    }
                                  }}
                                  numberOfMonths={1}
                                  className="w-full"
                                  disabled={(date: Date) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const normalizedDate = new Date(date);
                                    normalizedDate.setHours(0, 0, 0, 0);

                                    if (normalizedDate < today) return true;

                                    return unavailableDates.some(
                                      (d) =>
                                        d.getTime() === normalizedDate.getTime()
                                    );
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Guests */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full">
                      <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel
                              className={`${
                                errors.adults
                                  ? "text-red-600"
                                  : "text-neutral-400"
                              }`}
                            >
                              Adults
                            </FormLabel>
                            <FormControl>
                              <Stepper
                                value={field.value}
                                onChange={(v) => {
                                  const otherValue = form.getValues("children");
                                  if (v + otherValue <= room.maxGuests)
                                    field.onChange(v);
                                }}
                                min={1}
                                max={room.maxGuests - form.watch("children")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="children"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel
                              className={`${
                                errors.children
                                  ? "text-red-600"
                                  : "text-neutral-400"
                              }`}
                            >
                              Children
                            </FormLabel>
                            <FormControl>
                              <Stepper
                                value={field.value}
                                onChange={(v) => {
                                  const otherValue = form.getValues("adults");
                                  if (v + otherValue <= room.maxGuests)
                                    field.onChange(v);
                                }}
                                min={0}
                                max={room.maxGuests - form.watch("adults")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel
                              className={`${
                                errors.firstName
                                  ? "text-red-600"
                                  : "text-neutral-400"
                              }`}
                            >
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full h-12 items-center justify-start text-left rounded-xl sm:rounded-2xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel
                              className={`${
                                errors.lastName
                                  ? "text-red-600"
                                  : "text-neutral-400"
                              }`}
                            >
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full h-12 items-center justify-start text-left rounded-xl sm:rounded-2xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={`${
                              errors.email ? "text-red-600" : "text-neutral-400"
                            }`}
                          >
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="w-full h-12 items-center justify-start text-left rounded-xl sm:rounded-2xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <div className="space-y-1 flex-1">
                      <h2
                        className={`text-sm font-medium ${
                          errors.countryCode || errors.phone
                            ? "text-red-600"
                            : "text-neutral-400"
                        }`}
                      >
                        Phone Number
                      </h2>
                      <div className="flex w-full gap-2">
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="h-12! rounded-xl sm:rounded-2xl">
                                    <SelectValue placeholder="+60">
                                      {field.value}
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent
                                    align="start"
                                    className="rounded-xl sm:rounded-2xl"
                                  >
                                    <SelectItem
                                      value="+60"
                                      className="h-12 rounded-xl sm:rounded-2xl"
                                    >
                                      <ReactCountryFlag
                                        countryCode="MY"
                                        svg
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      />
                                      <span>Malaysia (+60)</span>
                                    </SelectItem>
                                    <SelectItem
                                      value="+62"
                                      className="h-12 rounded-xl sm:rounded-2xl"
                                    >
                                      <ReactCountryFlag
                                        countryCode="ID"
                                        svg
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      />
                                      <span>Indonesia (+62)</span>
                                    </SelectItem>
                                    <SelectItem
                                      value="+65"
                                      className="h-12 rounded-xl sm:rounded-2xl"
                                    >
                                      <ReactCountryFlag
                                        countryCode="SG"
                                        svg
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      />
                                      <span>Singapore (+65)</span>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  {...field}
                                  className="w-full h-12 items-center justify-start text-left rounded-xl sm:rounded-2xl"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      {(errors.countryCode || errors.phone) && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.countryCode?.message || errors.phone?.message}
                        </p>
                      )}
                    </div>

                    {/* Early Check-In */}
                    <FormField
                      control={form.control}
                      name="earlyCheckIn"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel
                            className={`${
                              errors.earlyCheckIn
                                ? "text-red-600"
                                : "text-neutral-400"
                            }`}
                          >
                            Early Check-In (Optional)
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                            >
                              <SelectTrigger className="w-full h-12! rounded-xl sm:rounded-2xl">
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                              <SelectContent
                                align="start"
                                className="rounded-xl sm:rounded-2xl"
                              >
                                {earlyCheckInSlots.map((slot) => (
                                  <SelectItem
                                    key={slot}
                                    value={slot}
                                    className="h-12 rounded-xl sm:rounded-2xl"
                                  >
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Remarks */}
                    <FormField
                      control={form.control}
                      name="remarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={`${
                              errors.remarks
                                ? "text-red-600"
                                : "text-neutral-400"
                            }`}
                          >
                            Remarks (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              maxLength={300}
                              className="h-36 rounded-xl sm:rounded-2xl"
                            />
                          </FormControl>
                          <div className="flex items-center justify-between">
                            <div className="text-start">
                              <FormMessage />
                            </div>
                            <FormDescription className="text-end">
                              Remaining: {300 - (field.value?.length ?? 0)}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="p-6 w-full rounded-full cursor-pointer text-white bg-amber-500 hover:bg-amber-600"
                    >
                      {submitting
                        ? "Booking..."
                        : `Book Now (RM${
                            room
                              ? room.price.current *
                                ((form.watch("checkOut")!.getTime() -
                                  form.watch("checkIn")!.getTime()) /
                                  (1000 * 60 * 60 * 24))
                              : 0
                          })`}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>

      <SuccessModal
        title="Booking Successful!"
        message="Your booking has been confirmed successfully. Thank you for choosing us."
        CTA="Done"
        isOpen={!!successMessage}
        onClose={() => {
          setSuccessMessage(null);
          router.push("/rooms");
        }}
      />
      <ErrorModal
        title="Booking Unsuccessful!"
        message="Something went wrong while processing your booking. Please try again later."
        CTA="Try Again"
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </section>
  );
}
