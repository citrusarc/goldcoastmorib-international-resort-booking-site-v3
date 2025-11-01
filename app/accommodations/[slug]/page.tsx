"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
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
    <div className="flex items-center border rounded-md overflow-hidden w-28">
      <Button
        type="button"
        variant="ghost"
        className="h-8 w-8 p-0 border border-neutral-200 rounded-full"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        –
      </Button>
      <div className="flex-1 text-center select-none">{value}</div>
      <Button
        type="button"
        variant="ghost"
        className="h-8 w-8 p-0"
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
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [accommodation, setAccommodation] = useState<AccommodationsItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);

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
            <div className="flex flex-col gap-4 sm:gap-8 shrink-0">
              <div className="relative w-full aspect-4/3 rounded-2xl sm:rounded-4xl overflow-hidden">
                <Image
                  fill
                  src={accommodation.src}
                  alt={accommodation.alt}
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                {accommodation.name}
              </h2>
              <p>{accommodation.description}</p>

              <ul className="flex flex-row sm:flex-col gap-4 justify-between sm:justify-start text-center sm:text-start">
                {accommodation.facilities?.map((item) => {
                  if (!item?.icon) return null;
                  const Icon = item.icon;
                  const itemClassName =
                    "flex flex-col sm:flex-row gap-2 sm:gap-4 items-center text-zinc-500";
                  return (
                    <li
                      key={item.label || Math.random()}
                      className={itemClassName}
                    >
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

            {/* FORM HERE */}
            <div className="relative z-10 flex flex-col w-full max-w-md sm:max-w-lg">
              <div className="relative p-4 sm:p-8 w-full rounded-2xl overflow-hidden text-neutral-600 bg-white shadow-md">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Dates */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="checkIn"
                        render={() => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date Range</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`
                w-full justify-start text-left font-normal
                ${
                  !form.watch("checkIn") || !form.watch("checkOut")
                    ? "text-muted-foreground"
                    : ""
                }
              `}
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
                                className="w-auto p-0"
                                align="start"
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
                                      form.setValue("checkIn", range.from); // //
                                      form.setValue("checkOut", range.to); // //
                                    } else if (range?.from) {
                                      form.setValue("checkIn", range.from); // //
                                      form.setValue("checkOut", range.from); // //
                                    }
                                  }}
                                  numberOfMonths={1}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Guests */}
                    <div className="flex flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Adults</FormLabel>
                            <FormControl>
                              <Stepper
                                value={field.value}
                                onChange={field.onChange}
                                min={1} // //
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
                            <FormLabel>Children</FormLabel>
                            <FormControl>
                              <Stepper
                                value={field.value}
                                onChange={field.onChange}
                                min={0} // //
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <div className="flex flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Country Code</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="+60" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+60">
                                    Malaysia (+60)
                                  </SelectItem>
                                  <SelectItem value="+62">
                                    Indonesia (+62)
                                  </SelectItem>
                                  <SelectItem value="+65">
                                    Singapore (+65)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Early Check-In */}
                    <FormField
                      control={form.control}
                      name="earlyCheckIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Early Check-In (Optional)</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                            >
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select a slot" />
                              </SelectTrigger>
                              <SelectContent>
                                {earlyCheckInSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
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
                          <FormLabel>Remarks (Optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} maxLength={300} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto"
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
        title="Your message has been sent!"
        message="We’ve received your inquiry and our team will be in touch soon. You may check your inbox for confirmation."
        CTA="Sounds Good"
        isOpen={!!successMessage}
        onClose={() => setSuccessMessage(null)}
      />
      <ErrorModal
        title="We couldn’t send your message!"
        message="Something went wrong while submitting your inquiry. Please try again in a moment."
        CTA="Got It"
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </section>
  );
}
