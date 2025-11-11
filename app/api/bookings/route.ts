import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

import { transporter } from "@/utils/email";
import { bookingEmailTemplate } from "@/utils/email/bookingEmailTemplate";
import { formatDate } from "@/utils/formatDate";

const CHIP_API_URL = "https://gate.chip-in.asia/api/v1/purchases/";
const CHIP_BRAND_ID = process.env.CHIP_BRAND_ID!;
const CHIP_TOKEN = process.env.CHIP_TEST_API_TOKEN!; // //
const SUCCESS_REDIRECT = `${process.env.NEXT_PUBLIC_BASE_URL}/success`;
const FAILURE_REDIRECT = `${process.env.NEXT_PUBLIC_BASE_URL}/failure`;

// GET all bookings
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");

    let query = supabase.from("bookings").select("*, accommodations(*)");

    if (email) query = query.eq("email", email);
    if (status) query = query.eq("status", status);

    const { data, error } = await query.order("createdAt", {
      ascending: false,
    });

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return NextResponse.json(data || []);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch bookings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST create a booking with CHIP purchase
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      accommodationsId,
      status,
      firstName,
      lastName,
      email,
      phone,
      checkIn,
      checkOut,
      adults,
      children,
      earlyCheckIn,
      remarks,
      paymentMethod,
    } = body;

    // Fetch accommodation and check availability
    const { data: accommodation, error: accommodationError } = await supabase
      .from("accommodations")
      .select("id, name, price, totalUnits")
      .eq("id", accommodationsId)
      .single();

    if (accommodationError || !accommodation) {
      return NextResponse.json(
        {
          error: `Accommodations not found: ${
            accommodationError?.message || "Unknown error"
          }`,
        },
        { status: 404 }
      );
    }

    const checkinDate = new Date(checkIn);
    const checkoutDate = new Date(checkOut);

    const price =
      typeof accommodation.price === "string"
        ? JSON.parse(accommodation.price)
        : accommodation.price;

    const nights = Math.max(
      1,
      Math.round(
        (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    const pricePerNight = Number(price.current);
    const totalPrice = pricePerNight * nights;
    const bookingNumber = `BKG-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Save booking to Supabase first
    const { data: newBooking, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          accommodationsId,
          bookingNumber,
          status: status || "pending",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          checkInDate: checkIn,
          checkOutDate: checkOut,
          nights,
          adults: Number(adults),
          children: Number(children),
          earlyCheckIn: earlyCheckIn || null,
          remarks: remarks?.trim() || null,
          currency: price.currency || "RM",
          pricePerNight,
          totalPrice,
        },
      ])
      .select("*, accommodations(*)")
      .single();

    if (bookingError)
      throw new Error(`Supabase insert error: ${bookingError.message}`);

    // Create CHIP purchase right after saving booking
    const chipPayload = {
      client: { email, full_name: `${firstName} ${lastName}`, phone },
      purchase: {
        products: [
          {
            name: accommodation.name || "Accommodation Booking",
            price: totalPrice * 100,
          },
        ],
        currency: "MYR",
        success_redirect: SUCCESS_REDIRECT,
        failure_redirect: FAILURE_REDIRECT,
      },
      brand_id: CHIP_BRAND_ID,
      reference: bookingNumber,
      send_receipt: true,
      platform: "web",
      ...(paymentMethod ? { payment_method_whitelist: [paymentMethod] } : {}),
    };

    const chipResponse = await fetch(CHIP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHIP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chipPayload),
    });

    const chipData = await chipResponse.json();

    if (!chipResponse.ok) {
      console.error("Chip API error:", chipData);
      return NextResponse.json(
        { error: chipData.message || "Failed to create Chip purchase." },
        { status: chipResponse.status }
      );
    }

    // Update booking with CHIP purchase_id
    await supabase
      .from("bookings")
      .update({
        chipPurchaseId: chipData.id,
        paymentStatus: "created",
      })
      .eq("id", newBooking.id);

    // Send email confirmation
    // try {
    //   await transporter.sendMail({
    //     from: `"Gold Coast Morib International Resort" <${process.env.EMAIL_USER}>`,
    //     to: email,
    //     bcc: process.env.ADMIN_EMAIL,
    //     subject: "Booking Confirmation",
    //     html: bookingEmailTemplate({
    //       bookingNumber,
    //       firstName,
    //       accommodationsName: accommodation?.name || "Accommodations",
    //       checkInDate: formatDate(checkinDate),
    //       checkOutDate: formatDate(checkoutDate),
    //       adults,
    //       children,
    //       earlyCheckIn,
    //       remarks,
    //       currency: price.currency || "RM",
    //       totalPrice,
    //       createdAt: formatDate(new Date()),
    //     }),
    //   });
    // } catch (emailError: unknown) {
    //   console.error("Email sending failed:", emailError);
    // }

    // Return checkout URL to frontend for redirect
    return NextResponse.json({
      success: true,
      booking: newBooking,
      checkout_url: chipData.checkout_url,
    });
  } catch (err: unknown) {
    console.error("Booking creation error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
