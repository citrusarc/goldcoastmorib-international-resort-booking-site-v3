import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/utils/neon/client";
import { BookingBody, BookingItem, PriceItem } from "@/types";

const CHIP_API_URL = "https://gate.chip-in.asia/api/v1/purchases/";
const CHIP_BRAND_ID = process.env.CHIP_BRAND_ID!;
const CHIP_TOKEN = process.env.CHIP_API_TOKEN!;

function calculateTotalPrice(checkIn: Date, checkOut: Date, price: PriceItem) {
  let weekdayNights = 0;
  let weekendNights = 0;
  const cur = new Date(checkIn);
  while (cur < checkOut) {
    const day = cur.getDay();
    if (day === 0 || day === 6) weekendNights++;
    else weekdayNights++;
    cur.setDate(cur.getDate() + 1);
  }
  const total = weekdayNights * price.weekday + weekendNights * price.weekend;
  return { total, weekdayNights, weekendNights };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const status = searchParams.get("bookingStatus");

    // Build query based on filters
    let data;

    if (email && status) {
      data = await sql`
        SELECT b.*, 
               json_build_object(
                 'id', r.id,
                 'name', r.name,
                 'price', r.price
               ) as rooms
        FROM bookings b
        LEFT JOIN rooms r ON b."roomsId" = r.id
        WHERE b.email = ${email}
          AND b."bookingStatus" = ${status}
        ORDER BY b."createdAt" DESC
      `;
    } else if (email) {
      data = await sql`
        SELECT b.*, 
               json_build_object(
                 'id', r.id,
                 'name', r.name,
                 'price', r.price
               ) as rooms
        FROM bookings b
        LEFT JOIN rooms r ON b."roomsId" = r.id
        WHERE b.email = ${email}
        ORDER BY b."createdAt" DESC
      `;
    } else if (status) {
      data = await sql`
        SELECT b.*, 
               json_build_object(
                 'id', r.id,
                 'name', r.name,
                 'price', r.price
               ) as rooms
        FROM bookings b
        LEFT JOIN rooms r ON b."roomsId" = r.id
        WHERE b."bookingStatus" = ${status}
        ORDER BY b."createdAt" DESC
      `;
    } else {
      data = await sql`
        SELECT b.*, 
               json_build_object(
                 'id', r.id,
                 'name', r.name,
                 'price', r.price
               ) as rooms
        FROM bookings b
        LEFT JOIN rooms r ON b."roomsId" = r.id
        ORDER BY b."createdAt" DESC
      `;
    }

    return NextResponse.json(data || []);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch bookings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingBody = await req.json();
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

    const roomResult = await sql`
      SELECT id, name, price, "totalUnits"
      FROM rooms
      WHERE id = ${roomsId}
      LIMIT 1
    `;

    const room = roomResult[0];
    if (!room) {
      return NextResponse.json({ error: `Rooms not found` }, { status: 404 });
    }

    const checkinDate = new Date(checkIn);
    const checkoutDate = new Date(checkOut);
    if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid check-in or check-out date" },
        { status: 400 }
      );
    }

    const price =
      typeof room.price === "string" ? JSON.parse(room.price) : room.price;
    const {
      total: totalPrice,
      weekdayNights,
      weekendNights,
    } = calculateTotalPrice(checkinDate, checkoutDate, price);

    const nightlyBreakdown = [
      { type: "weekday", nights: weekdayNights, price: price.weekday },
      { type: "weekend", nights: weekendNights, price: price.weekend },
    ];

    const bookingNumber = `BKG-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const bookingResult = await sql`
      INSERT INTO bookings (
        "bookingNumber", "roomsId", "firstName", "lastName", email, phone,
        "checkInDate", "checkOutDate", nights, adults, children,
        "earlyCheckIn", remarks, currency, "nightlyBreakdown",
        "totalPrice", "paymentMethod", "paymentStatus", "bookingStatus"
      ) VALUES (
        ${bookingNumber}, ${roomsId}, ${firstName.trim()}, ${lastName.trim()},
        ${email.trim()}, ${phone.trim()}, ${checkIn}, ${checkOut},
        ${weekdayNights + weekendNights}, ${Number(adults)}, ${Number(
      children
    )},
        ${earlyCheckIn || null}, ${remarks?.trim() || null}, ${
      price.currency || "RM"
    },
        ${JSON.stringify(nightlyBreakdown)}, ${totalPrice}, ${paymentMethod},
        'pending', 'pending'
      )
      RETURNING *
    `;

    const newBooking = bookingResult[0];

    const bookingData = {
      ...newBooking,
      rooms: room,
    };

    const SUCCESS_REDIRECT = `${process.env.NEXT_PUBLIC_SITE_URL}/rooms/${room.id}?status=success`;
    const FAILURE_REDIRECT = `${process.env.NEXT_PUBLIC_SITE_URL}/rooms/${room.id}?status=failed`;

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

      await sql`
        UPDATE bookings
        SET "paymentStatus" = 'failed',
            "bookingStatus" = 'cancelled_due_to_payment'
        WHERE id = ${newBooking.id}
      `;

      return NextResponse.json(
        { error: chipData.message || "Failed to create Chip purchase." },
        { status: chipResponse.status }
      );
    }

    await sql`
      UPDATE bookings
      SET "chipPurchaseId" = ${chipData.id},
          "paymentStatus" = 'pending',
          "bookingStatus" = 'awaiting_payment'
      WHERE id = ${newBooking.id}
    `;

    return NextResponse.json({
      success: true,
      booking: bookingData,
      checkout_url: chipData.checkout_url,
    });
  } catch (err: unknown) {
    console.error("Booking creation error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
