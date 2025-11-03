import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("accommodations")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Supabase accommodation fetch error:", error);
      return NextResponse.json(
        { error: "Accommodations not found" },
        { status: 404 }
      );
    }

    let price = data.price;
    if (typeof price === "string") {
      try {
        const parsed = JSON.parse(price);
        price = {
          currency: parsed.currency || "RM",
          current: Number(parsed.current ?? 0),
          original: Number(parsed.original ?? parsed.current ?? 0),
        };
      } catch {
        price = {
          currency: "RM",
          current: Number(price),
          original: Number(price),
        };
      }
    } else if (typeof price === "number") {
      price = { currency: "RM", current: price, original: price };
    } else {
      price = {
        currency: price?.currency || "RM",
        current: price?.current ?? 0,
        original: price?.original ?? price?.current ?? 0,
      };
    }

    return NextResponse.json({ ...data, price }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Error fetching accommodations:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
