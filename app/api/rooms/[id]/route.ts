import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Supabase room fetch error:", error);
      return NextResponse.json({ error: "Rooms not found" }, { status: 404 });
    }

    let price = data.price;
    if (typeof price === "string") {
      try {
        const parsed = JSON.parse(price);
        price = {
          currency: parsed.currency || "RM",
          weekday: Number(parsed.weekday ?? 0),
          weekend: Number(parsed.weekend ?? parsed.weekday ?? 0),
        };
      } catch {
        price = {
          currency: "RM",
          weekday: Number(price),
          weekend: Number(price),
        };
      }
    } else if (typeof price === "number") {
      price = { currency: "RM", weekday: price, weekend: price };
    } else {
      price = {
        currency: price?.currency || "RM",
        weekday: price?.weekday ?? 0,
        weekend: price?.weekend ?? price?.weekday ?? 0,
      };
    }

    return NextResponse.json({ ...data, price }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Error fetching rooms:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
