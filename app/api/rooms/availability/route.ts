import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/utils/db/client";
import { PriceItem } from "@/types";

function normalizePrice(price: unknown): PriceItem {
  if (typeof price === "string") {
    try {
      return JSON.parse(price) as PriceItem;
    } catch {
      return {
        currency: "RM",
        weekday: Number(price),
        weekend: Number(price),
      };
    }
  }
  if (typeof price === "number") {
    return { currency: "RM", weekday: price, weekend: price };
  }
  return price as PriceItem;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");

    if (!id) {
      return NextResponse.json({ error: "Missing room ID" }, { status: 400 });
    }
    if (!checkin || !checkout) {
      return NextResponse.json(
        { error: "Missing checkin/checkout dates" },
        { status: 400 }
      );
    }

    const bookings = await sql`
      SELECT "checkInDate", "checkOutDate"
      FROM bookings
      WHERE "roomsId" = ${id}
        AND "bookingStatus" = 'confirmed'
        AND ("checkOutDate" > ${checkin} OR "checkInDate" < ${checkout})
    `;

    const bookedDates: string[] = [];
    bookings?.forEach((booking: any) => {
      const start = new Date(booking.checkInDate + "T00:00");
      const end = new Date(booking.checkOutDate + "T00:00");
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        bookedDates.push(`${yyyy}-${mm}-${dd}`);
      }
    });

    return NextResponse.json(bookedDates);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("Availability API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
