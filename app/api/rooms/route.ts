import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import { PriceItem } from "@/types";

function normalizePrice(price: unknown): PriceItem {
  if (typeof price === "string") {
    try {
      const parsed = JSON.parse(price);
      return {
        currency: (parsed.currency as string) || "RM",
        current: Number(parsed.current ?? 0),
        original: Number(parsed.original ?? parsed.current ?? 0),
      };
    } catch {
      return {
        currency: "RM",
        current: Number(price),
        original: Number(price),
      };
    }
  }
  if (typeof price === "number") {
    return { currency: "RM", current: price, original: price };
  }
  return {
    currency: (price as PriceItem)?.currency || "RM",
    current: (price as PriceItem)?.current ?? 0,
    original:
      (price as PriceItem)?.original ?? (price as PriceItem)?.current ?? 0,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchAll = searchParams.get("all") === "true";
    const slug = searchParams.get("slug");
    const today = new Date().toISOString().split("T")[0];

    if (slug) {
      const { data, error } = await supabase
        .from("rooms")
        .select("*, totalUnits")
        .eq("id", slug)
        .single();
      if (error || !data) {
        console.error("Supabase single room error:", error);
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }
      return NextResponse.json({
        ...data,
        price: normalizePrice(data.price),
      });
    }

    const roomsQuery = supabase
      .from("rooms")
      .select("*, totalUnits")
      .order("id", { ascending: true });

    const { data: rooms, error: roomError } = await roomsQuery;

    if (roomError) {
      console.error("Supabase rooms error:", roomError);
      throw roomError;
    }

    if (fetchAll) {
      const allRooms = (rooms || []).map((r) => ({
        ...r,
        price: normalizePrice(r.price),
      }));
      return NextResponse.json(allRooms);
    }

    // Filter by availability based on today
    const { data: booked, error: bookingError } = await supabase
      .from("bookings")
      .select("roomsId")
      .eq("status", "confirmed")
      .lte("checkInDate", today)
      .gte("checkOutDate", today);

    if (bookingError) {
      console.error("Supabase booking error:", bookingError);
      throw bookingError;
    }

    const bookingCounts: Record<string, number> = {};
    booked?.forEach((b) => {
      bookingCounts[b.roomsId] = (bookingCounts[b.roomsId] || 0) + 1;
    });

    // Map and filter
    const availableRooms = (rooms || [])
      .map((r) => {
        const bookedCount = bookingCounts[r.id] || 0;
        const availableUnits = r.totalUnits - bookedCount;
        return {
          ...r,
          availableUnits,
          price: normalizePrice(r.price),
        };
      })
      .filter((r) => r.availableUnits > 0);

    return NextResponse.json(availableRooms);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("API /api/rooms error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
