import { NextResponse } from "next/server";
import { sql } from "@/utils/db/client";
import { PriceItem } from "@/types";

function normalizePrice(price: unknown): PriceItem {
  if (typeof price === "string") {
    try {
      const parsed = JSON.parse(price);
      return {
        currency: (parsed.currency as string) || "RM",
        weekday: Number(parsed.weekday ?? 0),
        weekend: Number(parsed.weekend ?? parsed.weekday ?? 0),
      };
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
  return {
    currency: (price as PriceItem)?.currency || "RM",
    weekday: (price as PriceItem)?.weekday ?? 0,
    weekend:
      (price as PriceItem)?.weekend ?? (price as PriceItem)?.weekday ?? 0,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchAll = searchParams.get("all") === "true";
    const slug = searchParams.get("slug");
    const today = new Date().toISOString().split("T")[0];

    if (slug) {
      const roomResult = await sql`
        SELECT *, "totalUnits"
        FROM rooms
        WHERE id = ${slug}
        LIMIT 1
      `;

      const data = roomResult[0];
      if (!data) {
        console.error("Room not found");
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }

      return NextResponse.json({
        ...data,
        price: normalizePrice(data.price),
      });
    }

    const rooms = await sql`
      SELECT *, "totalUnits"
      FROM rooms
      ORDER BY id ASC
    `;

    if (fetchAll) {
      const allRooms = (rooms || []).map((r) => ({
        ...r,
        price: normalizePrice(r.price),
      }));
      return NextResponse.json(allRooms);
    }

    const booked = await sql`
      SELECT "roomsId"
      FROM bookings
      WHERE "bookingStatus" = 'confirmed'
        AND "checkInDate" <= ${today}
        AND "checkOutDate" >= ${today}
    `;

    const bookingCounts: Record<string, number> = {};
    booked?.forEach((b: any) => {
      bookingCounts[b.roomsId] = (bookingCounts[b.roomsId] || 0) + 1;
    });

    const availableRooms = (rooms || [])
      .map((r: any) => {
        const bookedCount = bookingCounts[r.id] || 0;
        const availableUnits = r.totalUnits - bookedCount;
        return {
          ...r,
          availableUnits,
          price: normalizePrice(r.price),
        };
      })
      .filter((r: any) => r.availableUnits > 0);

    return NextResponse.json(availableRooms);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("API /api/rooms error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
