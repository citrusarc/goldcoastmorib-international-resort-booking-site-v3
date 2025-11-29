import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

const CHIP_API_URL = "https://gate.chip-in.asia/api/v1/purchases/";
const CHIP_BRAND_ID = process.env.CHIP_BRAND_ID!;
const CHIP_TOKEN = process.env.CHIP_TEST_API_TOKEN!;

// Function to calculate total price based on weekday/weekend rates
function calculateTotalPrice(checkIn: Date, checkOut: Date, price: any) {
  let weekdayNights = 0;
  let weekendNights = 0;
  const cur = new Date(checkIn);

  while (cur < checkOut) {
    const day = cur.getDay(); // 0=Sun, 6=Sat
    if (day === 0 || day === 6) weekendNights++;
    else weekdayNights++;
    cur.setDate(cur.getDate() + 1);
  }

  const total = weekdayNights * price.weekday + weekendNights * price.weekend;
  return { total, weekdayNights, weekendNights };
}

// GET all bookings
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const status = searchParams.get("bookingStatus");

    let query = supabase.from("bookings").select("*, rooms(*)");

    if (email) query = query.eq("email", email);
    if (status) query = query.eq("bookingStatus", status);

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      roomsId,
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

    // Fetch room and check availability
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("id, name, price, totalUnits")
      .eq("id", roomsId)
      .single();

    if (roomError || !room) {
      return NextResponse.json(
        {
          error: `Rooms not found: ${roomError?.message || "Unknown error"}`,
        },
        { status: 404 }
      );
    }

    const checkinDate = new Date(checkIn);
    const checkoutDate = new Date(checkOut);

    const price =
      typeof room.price === "string" ? JSON.parse(room.price) : room.price;

    const {
      total: totalPrice,
      weekdayNights,
      weekendNights,
    } = calculateTotalPrice(checkinDate, checkoutDate, price);

    const nightlyBreakdown = undefined;

    const bookingNumber = `BKG-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // 1. Create booking
    const { data: newBooking, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          bookingNumber,
          roomsId,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          checkInDate: checkIn,
          checkOutDate: checkOut,
          nights: weekdayNights + weekendNights,
          adults: Number(adults),
          children: Number(children),
          earlyCheckIn: earlyCheckIn || null,
          remarks: remarks?.trim() || null,
          currency: price.currency || "RM",
          nightlyBreakdown,
          totalPrice,
          paymentMethod,
          paymentStatus: "pending",
          bookingStatus: "pending",
        },
      ])
      .select("*, rooms(*)")
      .single();

    if (bookingError)
      throw new Error(`Supabase insert error: ${bookingError.message}`);

    const SUCCESS_REDIRECT = `${process.env.NEXT_PUBLIC_SITE_URL}/rooms/${room.id}?status=success`;
    const FAILURE_REDIRECT = `${process.env.NEXT_PUBLIC_SITE_URL}/rooms/${room.id}?status=failed`;

    // 2. Create CHIP payload
    const chipPayload = {
      client: { email, full_name: `${firstName} ${lastName}`, phone },
      purchase: {
        products: [
          {
            name: room.name || "Room Booking",
            price: totalPrice * 100,
          },
        ],
        currency: "MYR",
      },
      brand_id: CHIP_BRAND_ID,
      reference: bookingNumber,
      send_receipt: true,
      platform: "web",
      success_redirect: SUCCESS_REDIRECT,
      failure_redirect: FAILURE_REDIRECT,
      ...(paymentMethod ? { payment_method_whitelist: [paymentMethod] } : {}),
    };

    console.log(chipPayload);

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

      await supabase
        .from("bookings")
        .update({
          paymentStatus: "failed",
          bookingStatus: "cancelled_due_to_payment",
        })
        .eq("id", roomsId);
      return NextResponse.json(
        { error: chipData.message || "Failed to create Chip purchase." },
        { status: chipResponse.status }
      );
    }

    // 3. Update booking with CHIP purchase_id
    await supabase
      .from("bookings")
      .update({
        chipPurchaseId: chipData.id,
        paymentStatus: "pending",
        bookingStatus: "awaiting_payment",
      })
      .eq("id", newBooking.id);

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
