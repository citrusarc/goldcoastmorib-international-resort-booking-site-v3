"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

import { cormorantGaramond } from "@/config/fonts";
import { AccommodationsItem } from "@/types";
import { mapAccommodationsData } from "@/lib/mapAccommodationsData";
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
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="flex w-full items-center overflow-hidden">
      <Button
        type="button"
        variant="ghost"
        className="w-10 h-10 p-0 rounded-full border border-neutral-200 "
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        –
      </Button>
      <div className="flex-1 text-center select-none">{value}</div>
      <Button
        type="button"
        variant="ghost"
        className="w-10 h-10 p-0 rounded-full border border-neutral-200 "
        onClick={() => onChange(value + 1)}
      >
        +
      </Button>
    </div>
  );
}

export default function AccommodationsDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageCarousel, setImageCarousel] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [accommodation, setAccommodation] = useState<AccommodationsItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);

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
    if (!accommodation) return;

    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const payload = {
        accommodationsId: accommodation.id,
        status: "confirmed",
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: `${values.countryCode}${values.phone}`,
        checkIn: values.checkIn.toISOString(),
        checkOut: values.checkOut.toISOString(),
        adults: values.adults,
        children: values.children,
        earlyCheckIn: values.earlyCheckIn || null,
        remarks: values.remarks?.trim() || null,
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

      setSuccessMessage("Your booking has been submitted successfully!");
      form.reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error submitting booking";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const res = await fetch(`/api/accommodations/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch accommodations");

        const data = await res.json();

        const mappedData = mapAccommodationsData(data);
        setAccommodation(mappedData);
      } catch (err) {
        console.error("Error fetching accommodation:", err);
        setErrorMessage("Failed to load accommodation details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchAccommodation();
  }, [slug]);

  useEffect(() => {
    if (!accommodation?.src) return;

    const src = Array.isArray(accommodation.src)
      ? accommodation.src[0]
      : accommodation.src;

    const parts = src.split("/");
    const file = parts.pop()!;
    const [base, ext] = file.split(".");

    const baseWithoutIndex = base.replace(/-\d+$/, "");

    const allImages = Array.from({ length: 4 }, (_, i) => {
      return `${parts.join("/")}/${baseWithoutIndex}-${i + 1}.${ext}`;
    });

    setSelectedImage(allImages[0]);
    setImageCarousel(allImages);
  }, [accommodation?.src]);

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
        ) : !accommodation ? (
          <p className="text-center text-zinc-500 py-8">
            No accommodations available.
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
                      alt={accommodation.alt}
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
                        alt={`${accommodation.alt} ${index + 1}`}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-semibold">
                    {accommodation.name}
                  </h2>
                  <p
                    className={`px-2 py-1 w-fit rounded-full ${tagColor(
                      accommodation.tag
                    )}`}
                  >
                    {accommodation.tag}
                  </p>
                </div>
                <p>{accommodation.description}</p>
                <ul className="flex flex-col gap-4 justify-between sm:justify-start text-center sm:text-start">
                  {accommodation.facilities?.map((item) => {
                    if (!item?.icon) return null;
                    const Icon = item.icon;
                    const itemClassName =
                      "flex flex-row gap-4 items-center text-zinc-500";
                    return (
                      <li key={item.label} className={itemClassName}>
                        <Icon className="w-6 h-6" />
                        {item.label}
                      </li>
                    );
                  })}
                </ul>
                <p className="text-2xl sm:text-3xl font-semibold text-blue-600 ">
                  {accommodation.price.currency}
                  {accommodation.price.current}
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
                                className="p-2 w-[var(--radix-popover-trigger-width)] rounded-xl sm:rounded-2xl"
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
                                onChange={field.onChange}
                                min={1}
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
                                onChange={field.onChange}
                                min={0}
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
                                  <SelectTrigger className="!h-12 rounded-xl sm:rounded-2xl">
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
                              <SelectTrigger className="w-full !h-12 rounded-xl sm:rounded-2xl">
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
                      className="p-6 w-full rounded-full text-white bg-amber-500 hover:bg-amber-600"
                    >
                      {submitting ? "Booking..." : "Book Now"}
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
          router.push("/accommodations");
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
